import { execSync } from 'child_process';
import chalk from 'chalk';

function transpileOui(moduleType, outDir) {
  console.log(chalk.yellow(`Transpiling OUI to ${moduleType || 'ESM'}`));

  execSync(
    `babel --quiet --out-dir=${outDir} --extensions .js,.ts --ignore "**/*.test.ts,**/*.stories.ts,**/*.d.ts" src`,
    {
      env: {
        ...process.env,
        BABEL_MODULES: moduleType,
      },
    }
  );

  console.log(
    chalk.green(`Successfully transpiled OUI to ${moduleType || 'ESM'}`)
  );
}

transpileOui(undefined, 'es');
transpileOui('commonjs', 'dist');
