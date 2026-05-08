import Article from '../models/Article.js';

// @desc    Get all articles (published only for public)
// @route   GET /api/articles
// @access  Public
export const getArticles = async (req, res) => {
  try {
    const { published, featured, tags } = req.query;
    
    let query = {};
    
    // Public route only shows published articles
    if (published !== 'false') {
      query.published = true;
    }
    
    if (featured !== undefined) query.featured = featured === 'true';
    if (tags) query.tags = { $in: tags.split(',') };

    const articles = await Article.find(query)
      .sort({ createdAt: -1 })
      .populate('author', 'name email');

    res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all articles (including unpublished for admin)
// @route   GET /api/articles/all
// @access  Private/Admin
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .sort({ createdAt: -1 })
      .populate('author', 'name email');

    res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single article
// @route   GET /api/articles/:id
// @access  Public
export const getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'name email');

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    // Increment views
    article.views += 1;
    await article.save();

    res.status(200).json({
      success: true,
      data: article
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new article
// @route   POST /api/articles
// @access  Private/Admin
export const createArticle = async (req, res) => {
  try {
    const article = await Article.create({
      ...req.body,
      author: req.user.id
    });

    res.status(201).json({
      success: true,
      data: article
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update article
// @route   PUT /api/articles/:id
// @access  Private/Admin
export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    res.status(200).json({
      success: true,
      data: article
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete article
// @route   DELETE /api/articles/:id
// @access  Private/Admin
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Article deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
