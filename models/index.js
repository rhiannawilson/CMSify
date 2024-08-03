// central file that organises your models, importing them so we can use them, adds associations and exports them 

const User = require('./user');
const Project = require('./project');

User.hasMany(Project, {
  foreignKey: 'user_id', // a column that references to another table
  onDelete: 'CASCADE'
});

Project.belongsTo(User, { // project belongs to a sql user
  foreignKey: 'user_id'
});

module.exports = { User, Project };
