import chokidar from 'chokidar';
import generateBuild from './generate-build';

chokidar.watch('.', {ignored:/dist|node_modules|.git/}).on('all', (event, path) => {
  console.log(event, path);
  generateBuild();
});