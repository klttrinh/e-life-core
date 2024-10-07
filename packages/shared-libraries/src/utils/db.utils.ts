import { snake } from 'snake-camel';
import moment from 'moment';
import { Op, WhereOptions } from 'sequelize';
import { OrderEnum } from '../models/general/enums/order.enum';
import { QueryOptions } from '../general/base.repository';
import { isDefined } from './helpers.util';
import { QueryOperatorEnum } from '../models';

export async function paginate<T>(
  model: any,
  start: number,
  end: number, // pass Number.MAX_SAFE_INTEGER if you want no upper limit in query
  {
    order,
    sort,
    where,
    include,
    plain,
    nest,
    raw,
    attributes,
    paranoid,
  }: QueryOptions & { order?: OrderEnum; sort?: string } = {},
): Promise<{ count: number; rows: T[] }> {
  const offset = start || 0;
  // if Number.MAX_SAFE_INTEGER passed as end, the limit will be null resulting in having no upper limit in query
  const limit = Number.MAX_SAFE_INTEGER === end ? null : end - offset || 20;

  return model.findAndCountAll({
    where,
    include,
    limit,
    offset,
    order: [[sort ? snake(sort) : 'updated_at', order ? order.toUpperCase() : 'DESC']],
    col: `id`,
    distinct: true,
    plain: Boolean(plain),
    raw: Boolean(raw),
    nest: Boolean(nest),
    paranoid: paranoid !== false, // default true
    attributes,
  });
}

export interface IGetCountWithDetails {
  total: number | string;
  details?: object;
  currencyCode?: string;
}

export interface GetCountWithWithdrawal {
  deposit: IGetCountWithDetails;
  withdrawal: IGetCountWithDetails;
  refund: IGetCountWithDetails;
}

export async function getCountWithDetails<T>(
  model: any,
  {
    startDate,
    endDate,
    order,
    sort,
    where,
  }: {
    order?: OrderEnum;
    sort?: string;
    startDate?: string | Date;
    endDate?: string | Date;
    where?: object;
  } = {},
): Promise<IGetCountWithDetails> {
  sort = sort ? snake(sort) : 'created_at';
  order = order || OrderEnum.DESC;

  const docs = await model.findAll({
    where,
    order: [[sort, order]],
    raw: true,
  });

  const result: IGetCountWithDetails = {
    total: docs.length,
  };

  if (!startDate && !endDate) {
    return result;
  }

  if (!docs.length) {
    result.currencyCode = '';
  }

  // handle situation where start and end are not passed
  const ascending = order === OrderEnum.ASC;
  if (!startDate) {
    startDate = ascending ? docs[0][sort] : docs[docs.length - 1][sort];
  }
  if (!endDate) {
    endDate = ascending ? docs[docs.length - 1][sort] : docs[0][sort];
    if (endDate === startDate) {
      // so there is difference, and we get that transaction's data
      endDate = ascending ? moment(endDate).add(1, 'm').toDate() : moment(endDate).subtract(1, 'm').toDate();
    }
  }

  const details = new Map();
  const monthsDiff = Math.ceil(moment(endDate).diff(moment(startDate), 'months', true));
  // Math.ceil used so for two dates
  // startDate: 2022-07-28T11:14:48.611Z,
  // endDate: 2022-08-02T09:01:31.999Z,
  // we would have 2 months:
  // '2022-Jul'
  // '2022-Aug'
  for (let i = 0; i < monthsDiff; i++) {
    // initialize the months between startDate and endDate with 0
    const date = moment(startDate).add(i, 'months');
    const key = `${date.year()}-${date.format('MMM')}`;
    details.set(key, 0);
  }
  // eslint-disable-next-line no-restricted-syntax
  for await (const doc of docs) {
    const date = moment(doc[sort]);
    const key = `${date.year()}-${date.format('MMM')}`;
    if (details.has(key)) {
      // if date range has not been provided we wont have the keys
      details.set(key, Number(details.get(key)) + 1);
    } else {
      details.set(key, 1);
    }
  }

  result.details = Array.from(details.entries()).reduce((obj: any, [k, v]) => {
    obj[k] = v;
    return obj;
  }, {});

  return result;
}

export function filterByOp(data: any, where: WhereOptions) {
  const mapper = {
    [QueryOperatorEnum.IN]: Op.in,
    [QueryOperatorEnum.NOTIN]: Op.notIn,
  };
  if (isDefined(data.filterByOps)) {
    data.filterByOps.forEach((f) => {
      const val = f.value.replaceAll("'", '').replaceAll('[', '').replaceAll(']', '').split('&');
      where[f.field] = { [mapper[f.op]]: val };
    });
  }
}
