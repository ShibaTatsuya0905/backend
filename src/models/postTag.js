module.exports = (sequelizeInstance, DataTypes) => {
  const PostTag = sequelizeInstance.define('PostTag', {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, 
      references: {
        model: 'posts', 
        key: 'id',
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, 
      references: {
        model: 'tags', 
        key: 'id',
      },
    },
  }, {
    tableName: 'post_tags',
    timestamps: false, 
  });

  return PostTag;
};