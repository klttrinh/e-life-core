import { Model } from 'sequelize-typescript';
import _ from 'lodash';
import * as rdiff from 'recursive-diff';

export class BaseLogService<T extends Model> {
  /* private compareObjects(
    a: object,
    b: object,
  ): {
    allDifferences: {
      [key: string]: { previous: any; after: any };
    }[];
    different: any[];
    missingFromFirst: any[];
    missingFromSecond: any[];
  } {
    const result = {
      different: [],
      missingFromFirst: [],
      missingFromSecond: [],
    };

    _.reduce(
      a,
      (result, value, key) => {
        // eslint-disable-next-line no-prototype-builtins
        if (b?.hasOwnProperty(key)) {
          if (_.isEqual(value, b[key])) {
            return result;
          }
          if (typeof a[key] !== typeof {} || typeof b[key] !== typeof {}) {
            // dead end.
            result.different.push(key);
            return result;
          }
          const deeper = this.compareObjects(a[key], b[key]);
          result.different = result.different.concat(
            _.map(deeper.different, (sub) => {
              return `${key}.${sub}`;
            }),
          );

          result.missingFromSecond = result.missingFromSecond.concat(
            _.map(deeper.missingFromSecond, (sub) => {
              return `${key}.${sub}`;
            }),
          );

          result.missingFromFirst = result.missingFromFirst.concat(
            _.map(deeper.missingFromFirst, (sub) => {
              return `${key}.${sub}`;
            }),
          );
          return result;
        }
        result.missingFromSecond.push(key);
        return result;
      },
      result,
    );

    _.reduce(
      b,
      (result, value, key) => {
        // eslint-disable-next-line no-prototype-builtins
        if (a?.hasOwnProperty(key)) {
          return result;
        }
        result.missingFromFirst.push(key);
        return result;
      },
      result,
    );

    return {
      ...result,
      allDifferences: _.uniq([...result.different, ...result.missingFromFirst, ...result.missingFromSecond]),
    };
  } */

  private static compareObjects(oldData: any, newData: any): { previousValues: any; updates: any; actions: any[] } {
    return (rdiff.getDiff(oldData, newData, true) || []).reduce(
      (total, { op, path, val, oldVal }: any) => {
        /* const address = path[0];
        const isArray = !Number.isNaN(path[path.length - 1]); */
        if (['updated_at', 'deleted_at'].includes(path[path.length - 1] as any)) {
          return total;
        }
        const isArray = Array.isArray(_.get(oldData, path[0]));
        const originalPath = [...path];
        if (!isArray) {
          for (let i = 0; i < path.length; i++) {
            const p = path[i];
            if (typeof p === 'number') {
              path.splice(i, path.length - 1); // allows only the first depth in the array to be logged
              break;
            }
          }
        }
        total.actions.push({ action: op, path: originalPath, oldValue: oldVal, newValue: val });
        if (!isArray) {
          _.setWith(total.updates, path, _.get(newData, path), Object);
          _.setWith(total.previousValues, path, _.get(oldData, path), Object);
        } else {
          _.set(total.updates, path, _.get(newData, path));
          _.set(total.previousValues, path, _.get(oldData, path));
        }

        return total;
      },
      { previousValues: {}, updates: {}, actions: [] },
    );
  }

  public static extractChangedAttributes(
    previous: object,
    newVal: object,
  ): { updates: any; previousValues: any; actions: any[] } | undefined {
    newVal = _.cloneDeep(newVal);
    previous = _.cloneDeep(previous);

    // eslint-disable-next-line no-unused-expressions
    'updated_at' in newVal && delete newVal.updated_at;
    // eslint-disable-next-line no-unused-expressions
    'updated_at' in previous && delete previous.updated_at;

    // eslint-disable-next-line no-unused-expressions
    'updatedAt' in newVal && delete newVal.updatedAt;
    // eslint-disable-next-line no-unused-expressions
    'updatedAt' in previous && delete previous.updatedAt;

    /* _.uniq([...Object.keys(newVal), ...Object.keys(previous)]).forEach((key) => {
      if (!isDefined(previous[key])) {
        previous[key] = null;
      }
      if (!isDefined(newVal[key])) {
        newVal[key] = null;
      }
    }); */

    /* const differences = this.compareObjects(previous, newVal).allDifferences.reduce(
      (changes, key: any) => {
        _.set(changes.updates, key, _.get(newVal, key));
        _.set(changes.previousValues, key, _.get(previous, key));
        return changes;
      },
      { updates: {}, previousValues: {} },
    ); */

    const differences = this.compareObjects(previous, newVal);

    if (Object.keys(differences.updates).length === 0) {
      return undefined;
    }

    return differences;
    /*

    if (Object.keys(differences.updates).length === 0) {
      return { previousValues: {}, updates: {}, actions: [] };
    }
*/
  }
}
