import config from '@pinback/eslint-config/react-internal';
import reactRefresh from 'eslint-plugin-react-refresh';

/** @type {import("eslint").Linter.Config} */
export default [...config, reactRefresh.configs.vite];
