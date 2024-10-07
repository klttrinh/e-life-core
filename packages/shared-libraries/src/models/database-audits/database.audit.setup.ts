import { DataTypes, QueryInterface } from 'sequelize';

const tableName = 'database_audits';

export class DatabaseAuditSetup {
  public static async install(queryInterface: QueryInterface, allTables: string[], filters: string[]) {
    if (!filters.includes(tableName)) {
      filters.push(tableName);
    }
    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      table_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      entry_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      old_value: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      new_value: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });

    await queryInterface.sequelize.query(`CREATE OR REPLACE FUNCTION notify_trigger_function()
    RETURNS TRIGGER AS $$
    BEGIN
      INSERT INTO ${tableName} (action, entry_id, table_name, old_value, new_value, created_at, updated_at)
      VALUES (
          TG_OP,
          COALESCE(OLD.id, NEW.id),
          TG_TABLE_NAME,
          to_jsonb(OLD.*),
          to_jsonb(NEW.*),
          NOW(),
          NOW()
      );
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;`);

    for (const table of allTables) {
      if (filters.includes(table)) {
        continue;
      }
      if (table.includes('-')) {
        throw new Error(`can not create trigger for table ${table}`);
      }
      try {
        await queryInterface.sequelize.query(`CREATE TRIGGER ${table}_notification_trigger
            AFTER INSERT OR UPDATE OR DELETE
            ON ${table}
            FOR EACH ROW
            WHEN (pg_trigger_depth() < 1)
            EXECUTE FUNCTION notify_trigger_function();`);
      } catch (e) {
        console.error(e);
      }
    }
  }
}
