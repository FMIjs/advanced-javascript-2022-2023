const myExpress = require('./my-express.js');
const port = 8080;

const users = [
  { username: 'Ivan', id: 1 },
  { username: 'Pesho', id: 2 },
  { username: 'Gosho', id: 3 }
];

const app = myExpress();

app.use(myExpress.jsonParser);

app.get('\/user$', (req, res) => {
  res.write(JSON.stringify(users));
});

app.post('\/user$', (req, res) => {
  const { body } = req;
  const id = users.length + 1;
  const user = { ...body, id };
  users.push(user);
  res.write(JSON.stringify(user));
});


app.get('\/user\/(?<id>[^\/]*)$', (req, res) => {
  const { params: { id } } = req;
  if (!id) { return void res.write(null); }
  res.write(JSON.stringify(users[id - 1] || null));
});

// /user/:id
app.delete('\/user\/(?<id>[^\/]*)$', (req, res) => {
  const { params: { id } } = req;
  if (!id) { return void res.write(null); }
  const deletedUser = users[id - 1];
  delete users[id - 1];
  res.write(JSON.stringify(deletedUser));
});

app.put('\/user\/(?<id>[^\/]*)$', (req, res) => {
  const { params: { id }, body } = req;
  const user = users[id - 1];
  if (!user) { return void res.write(null); }
  const updatedUser = { ...user, ...body };
  users[id - 1] = updatedUser;
  res.write(JSON.stringify(updatedUser));
});


app.listen(port, () => {
  console.log(`Server is listening :${port}`);
});