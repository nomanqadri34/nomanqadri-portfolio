import emailjs from '@emailjs/browser';

// Email service configuration
const EMAIL_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAIL_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_BLOG_TEMPLATE_ID;
const EMAIL_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

// Send blog update email to subscribers
const sendBlogUpdateEmail = async (subscribers, blogData) => {
  try {
    const emailPromises = subscribers.map(email => {
      const templateParams = {
        to_email: email,
        blog_title: blogData.title,
        blog_excerpt: blogData.excerpt,
        blog_url: blogData.url
      };

      return emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        templateParams,
        EMAIL_PUBLIC_KEY
      );
    });

    await Promise.all(emailPromises);
    return true;
  } catch (error) {
    console.error('Failed to send blog update email:', error);
    throw error;
  }
};

// Mock function - replace with actual API call
const fetchSubscribers = async () => {
  // In a real application, this would be an API call to your backend
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock data
      resolve([
        'subscriber1@example.com',
        'subscriber2@example.com'
        // ... more subscribers
      ]);
    }, 1000);
  });
};

export const notifySubscribersAboutBlogPost = async (blogPost) => {
  try {
    const subscribers = await fetchSubscribers();
    
    if (subscribers.length > 0) {
      await sendBlogUpdateEmail(subscribers, {
        title: blogPost.title,
        excerpt: blogPost.excerpt || blogPost.content.substring(0, 150) + '...',
        url: `${window.location.origin}/blog/${blogPost.slug}`
      });
    }
  } catch (error) {
    console.error('Failed to notify subscribers:', error);
    throw error;
  }
}; 