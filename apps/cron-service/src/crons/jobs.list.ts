import { InternalEventsEnum } from '@e-life/internal-api';
import { set } from 'lodash';
import { CronExpression } from './cron.expression.enum';
import { SERVER_KEY } from './server.key.enum';

export type JobListType = {
  [cronExpression in CronExpression]?: {
    [server in SERVER_KEY]: string[];
  };
};
const constantJobs: JobListType = {
  [CronExpression.EVERY_DAY_AT_MIDNIGHT]: {
    [SERVER_KEY.PG]: [],
    [SERVER_KEY.TS]: [],
    [SERVER_KEY.RS]: [],
    [SERVER_KEY.OFR]: [],
    [SERVER_KEY.TPE]: [],
  },
  [CronExpression.EVERY_DAY_AT_1AM]: {
    [SERVER_KEY.PG]: [],
    [SERVER_KEY.TS]: [],
    [SERVER_KEY.RS]: [],
    [SERVER_KEY.OFR]: [],
    [SERVER_KEY.TPE]: [],
  },
  [CronExpression.EVERY_6_HOURS]: {
    [SERVER_KEY.PG]: [],
    [SERVER_KEY.TS]: [],
    [SERVER_KEY.RS]: [],
    [SERVER_KEY.OFR]: [],
    [SERVER_KEY.TPE]: [],
  },
  [CronExpression.EVERY_HOUR]: {
    [SERVER_KEY.PG]: [],
    [SERVER_KEY.TS]: [],
    [SERVER_KEY.RS]: [],
    [SERVER_KEY.OFR]: [],
    [SERVER_KEY.TPE]: [],
  },
  [CronExpression.EVERY_MINUTE]: {
    [SERVER_KEY.PG]: [],
    [SERVER_KEY.TS]: [],
    [SERVER_KEY.RS]: [],
    [SERVER_KEY.OFR]: [],
    [SERVER_KEY.TPE]: [],
  },
  [CronExpression.EVERY_5_MINUTES]: {
    [SERVER_KEY.PG]: [],
    [SERVER_KEY.TS]: [],
    [SERVER_KEY.RS]: [],
    [SERVER_KEY.OFR]: [],
    [SERVER_KEY.TPE]: [],
  },
};

const configurableJobsCronExpressions: {
  expression: CronExpression;
  endpoint: { serverKey: SERVER_KEY; url: string };
}[] = [];

const addConfigurableJobsToJobList = (jobsList: JobListType): JobListType => {
  for (const obj of configurableJobsCronExpressions) {
    const {
      endpoint: { serverKey, url },
      expression,
    } = obj;

    const jobsArray = jobsList[expression]?.[serverKey];
    if (jobsArray && Array.isArray(jobsArray)) {
      jobsArray.push(url);
    } else {
      set(jobsList, [expression, serverKey, 0], url);
    }
  }
  return jobsList;
};

const JobsList = addConfigurableJobsToJobList(constantJobs);

export default JobsList;
