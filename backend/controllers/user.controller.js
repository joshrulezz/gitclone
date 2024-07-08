export const getUserProfileAndRepos = async (req, res) => {
    const { username } = req.params;
    try {
      // Define a function to check response status and content type
      const checkResponse = async (response) => {
        if (!response.ok) {
          const errorMessage = await response.text(); // Read the response body as text
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const errorMessage = await response.text(); // Read the response body as text
          throw new Error(`Unexpected content type! Expected application/json but received ${contentType}. Response: ${errorMessage}`);
        }
        return response.json();
      };
  
      // Fetch user profile
      const userRes = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          authorization: `token ${process.env.GITHUB_API_KEY}`,
        },
      });
      const userProfile = await checkResponse(userRes);
  
      // Fetch user repositories
      const repoRes = await fetch(userProfile.repos_url, {
        headers: {
          authorization: `token ${process.env.GITHUB_API_KEY}`,
        },
      });
      const repos = await checkResponse(repoRes);
  
      res.status(200).json({ userProfile, repos });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  