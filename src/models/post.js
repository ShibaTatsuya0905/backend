module.exports = (sequelizeInstance, DataTypes) => {
  const Post = sequelizeInstance.define('Post', {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(280),
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cover_image_url: {
      type: DataTypes.TEXT, 
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      defaultValue: 'draft',
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: { 
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    published_at: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    tableName: 'posts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
   
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'authorDetails', 
    });

    Post.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'categoryDetails', 
    });

    Post.belongsToMany(models.Tag, {
      through: models.PostTag, 
      foreignKey: 'post_id',   
      otherKey: 'tag_id',      
      as: 'tags',              
    });
  };

  return Post;
};