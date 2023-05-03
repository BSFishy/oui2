import { rimraf } from 'rimraf';

rimraf.sync('dist');
rimraf.sync('es');
rimraf.sync('playwright-report');
rimraf.sync('reports');
rimraf.sync('storybook');
rimraf.sync('test-results');
rimraf.sync('types');
