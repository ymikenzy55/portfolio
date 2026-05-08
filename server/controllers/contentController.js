import SiteContent from '../models/SiteContent.js';

// @desc    Get site content
// @route   GET /api/site-content
// @access  Public
export const getSiteContent = async (req, res) => {
  try {
    const contents = await SiteContent.find();
    
    // Transform array to object with keys
    const contentObj = {};
    contents.forEach(item => {
      contentObj[item.key] = item.content;
    });

    res.status(200).json({
      success: true,
      content: contentObj
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get specific content by key
// @route   GET /api/site-content/:key
// @access  Public
export const getContentByKey = async (req, res) => {
  try {
    const content = await SiteContent.findOne({ key: req.params.key });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    res.status(200).json({
      success: true,
      data: content.content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update site content
// @route   PUT /api/site-content
// @access  Private/Admin
export const updateSiteContent = async (req, res) => {
  try {
    const updates = req.body;
    const results = [];

    // Update each content key
    for (const [key, content] of Object.entries(updates)) {
      const updated = await SiteContent.findOneAndUpdate(
        { key },
        { content },
        {
          new: true,
          upsert: true,
          runValidators: true
        }
      );
      results.push(updated);
    }

    // Get all content
    const allContent = await SiteContent.find();
    const contentObj = {};
    allContent.forEach(item => {
      contentObj[item.key] = item.content;
    });

    res.status(200).json({
      success: true,
      content: contentObj
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update specific content by key
// @route   PUT /api/site-content/:key
// @access  Private/Admin
export const updateContentByKey = async (req, res) => {
  try {
    const content = await SiteContent.findOneAndUpdate(
      { key: req.params.key },
      { content: req.body },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: content.content
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
