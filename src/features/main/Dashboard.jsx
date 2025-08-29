import React from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import CommunityCard from '../../utils/components/Commen/CommunityCard';
import OpportunityCard from '../../utils/components/Commen/OpportunityCard';
import SectionHeader from '../../utils/components/Commen/SectionHeader';




const Dashboard = () => {
  const trendingCommunities = [
    {
      id: 'meta-ai',
      name: 'Meta AI',
      description: 'Community for Meta AI Discussions and Updates',
      members: '18k+',
      icon: 'https://via.placeholder.com/80/1877f2/white?text=F',
      gradient: 'linear-gradient(135deg, #1877f2 0%, #42a5f5 100%)',
      headerImage: 'https://via.placeholder.com/400x150/1877f2/000000?text='
    },
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      description: 'Community for Open AI related Discussions and Updates',
      members: '11k+',
      icon: 'https://via.placeholder.com/80/00a67e/white?text=C',
      gradient: 'linear-gradient(135deg, #00a67e 0%, #4caf50 100%)',
      headerImage: 'https://via.placeholder.com/400x150/00a67e/000000?text='
    },
    {
      id: 'among-us',
      name: 'Among Us',
      description: 'Community for "Among Us" Discussions and Updates',
      members: '4k+',
      icon: 'https://via.placeholder.com/80/e74c3c/white?text=A',
      gradient: 'linear-gradient(135deg, #e74c3c 0%, #ff6b9d 100%)',
      headerImage: 'https://via.placeholder.com/400x150/e74c3c/000000?text='
    },
    {
      id: 'pubg-mobile',
      name: 'PUBG Mobile',
      description: 'Community for PUBG Mobile Discussions and Updates',
      members: '7k+',
      icon: 'https://via.placeholder.com/80/f39c12/white?text=P',
      gradient: 'linear-gradient(135deg, #f39c12 0%, #ff9500 100%)',
      headerImage: 'https://via.placeholder.com/400x150/f39c12/000000?text='
    }
  ];

  const opportunities = [
    {
      id: 'youtube-thumbnail-1',
      title: 'Pitch Your Big Idea in 60 Seconds',
      community: 'Facebook',
      image: 'https://via.placeholder.com/400x250/ff6b35/white?text=HOW+TO+MAKE+A+THUMBNAIL+FOR+YOUTUBE',
      gradient: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)'
    },
    {
      id: 'youtube-thumbnail-2',
      title: 'Design a Logo that Defines Our Community',
      community: 'ChatGPT',
      image: 'https://via.placeholder.com/400x250/8e44ad/white?text=BEST+YOUTUBE+THUMBNAIL+MAKER',
      gradient: 'linear-gradient(135deg, #8e44ad 0%, #3498db 100%)'
    },
    {
      id: 'try-not-laugh',
      title: 'Pitch Your Big Idea in 60 Seconds',
      community: 'ChatGPT',
      image: 'https://via.placeholder.com/400x250/34495e/white?text=TRY+NOT+TO+LAUGH+CHALLENGE',
      gradient: 'linear-gradient(135deg, #34495e 0%, #2c3e50 100%)'
    },
    {
      id: 'attractive-thumbnail',
      title: 'Design a Logo that Defines Our Community',
      community: 'Mr. Beast',
      image: 'https://via.placeholder.com/400x250/27ae60/white?text=ATTRACTIVE+YOUTUBE+THUMBNAIL',
      gradient: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)'
    }
  ];

  return (
    <div className="discover-page">
      <div className="page-header">
        <h1 className="page-title">Discover Communities</h1>
      </div>

      {/* Trending Communities Section */}
      <section className="trending-section">
        <SectionHeader
          icon="🔥"
          title="Trending Communities"
          subtitle="Based on user interactions and engagement."
          showNavigation
        />
        
        <div className="communities-grid">
          {trendingCommunities.map(community => (
            <CommunityCard
              key={community.id}
              community={community}
            />
          ))}
        </div>
      </section>

      {/* Ongoing Opportunities Section */}
      <section className="opportunities-section">
        <SectionHeader
          icon="🏆"
          title="Ongoing Opportunities"
          subtitle="Be the first to win exciting rewards."
          showNavigation
        />
        
        <div className="opportunities-grid">
          {opportunities.map(opportunity => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
            />
          ))}
        </div>
      </section>
    </div>
  );
};


export default Dashboard;
