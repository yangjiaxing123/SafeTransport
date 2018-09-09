import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/users').default);
app.model(require('./models/posts').default);
app.model(require('./models/albums').default);
app.model(require('./models/postDetail').default);
app.model(require('./models/photos').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
