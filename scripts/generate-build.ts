import { build } from 'esbuild';
import  fs from 'fs-extra';

const generateBuild = async (): Promise<void> => {
  fs.rmdirSync('./dist', { recursive: true });

  try {
    await build({
      entryPoints: ['./src/index.tsx'],
      outdir: './dist/js',
      minify: true,
      bundle: true,
      sourcemap: true,
      target: ['chrome58', 'firefox57', 'edge16'],
      loader: { '.svg': 'dataurl', '.png': 'dataurl' },
      define: {
        'process.env.NODE_ENV': '\'development\'',
      }
    });
      
  } catch (err) {
    process.exit(1);
  }

  fs.copy('./public/index.html', './dist/index.html', (err) => {
    if (err) return console.error(err);
    return null;
  }
  );
};

export default generateBuild;