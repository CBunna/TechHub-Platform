import React, { useState, useMemo } from 'react';
import { Search, Code, Server, Database, Cloud, BookOpen, TrendingUp, Star, Clock, Users, ArrowRight } from 'lucide-react';

const TechPlatform = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: BookOpen, color: 'from-purple-500 to-pink-500' },
    { id: 'devops', name: 'DevOps', icon: Server, color: 'from-blue-500 to-cyan-500' },
    { id: 'frontend', name: 'Frontend', icon: Code, color: 'from-green-500 to-teal-500' },
    { id: 'backend', name: 'Backend', icon: Database, color: 'from-orange-500 to-red-500' },
    { id: 'cloud', name: 'Cloud', icon: Cloud, color: 'from-indigo-500 to-purple-500' },
  ];

  const resources = [
    {
      id: 1,
      title: 'Complete Docker Guide for Developers',
      category: 'devops',
      description: 'Master containerization with Docker from basics to advanced orchestration techniques.',
      author: 'Sarah Chen',
      readTime: '12 min',
      popularity: 4.9,
      tags: ['Docker', 'Containers', 'DevOps'],
      featured: true,
      type: 'Tutorial'
    },
    {
      id: 2,
      title: 'Kubernetes Cluster Management Best Practices',
      category: 'devops',
      description: 'Learn how to efficiently manage and scale Kubernetes clusters in production.',
      author: 'Mike Rodriguez',
      readTime: '8 min',
      popularity: 4.7,
      tags: ['Kubernetes', 'Orchestration', 'Production'],
      featured: true,
      type: 'Guide'
    },
    {
      id: 3,
      title: 'React Performance Optimization Techniques',
      category: 'frontend',
      description: 'Advanced strategies to optimize React applications for better performance.',
      author: 'Emily Park',
      readTime: '15 min',
      popularity: 4.8,
      tags: ['React', 'Performance', 'Optimization'],
      featured: false,
      type: 'Tutorial'
    },
    {
      id: 4,
      title: 'Building Scalable Node.js APIs',
      category: 'backend',
      description: 'Design patterns and architectures for creating robust backend services.',
      author: 'David Kumar',
      readTime: '10 min',
      popularity: 4.6,
      tags: ['Node.js', 'API', 'Scalability'],
      featured: false,
      type: 'Guide'
    },
    {
      id: 5,
      title: 'AWS Lambda Functions Deep Dive',
      category: 'cloud',
      description: 'Comprehensive guide to serverless computing with AWS Lambda.',
      author: 'Lisa Wang',
      readTime: '14 min',
      popularity: 4.5,
      tags: ['AWS', 'Lambda', 'Serverless'],
      featured: true,
      type: 'Tutorial'
    },
    {
      id: 6,
      title: 'CI/CD Pipeline Implementation',
      category: 'devops',
      description: 'Step-by-step guide to setting up automated deployment pipelines.',
      author: 'James Wilson',
      readTime: '18 min',
      popularity: 4.7,
      tags: ['CI/CD', 'Automation', 'GitLab'],
      featured: false,
      type: 'Workshop'
    },
    {
      id: 7,
      title: 'Modern JavaScript ES2024 Features',
      category: 'frontend',
      description: 'Explore the latest JavaScript features and how to use them effectively.',
      author: 'Anna Smith',
      readTime: '6 min',
      popularity: 4.4,
      tags: ['JavaScript', 'ES2024', 'Modern JS'],
      featured: false,
      type: 'Overview'
    },
    {
      id: 8,
      title: 'Database Design Patterns for Scale',
      category: 'backend',
      description: 'Learn proven database design patterns for high-traffic applications.',
      author: 'Robert Brown',
      readTime: '20 min',
      popularity: 4.6,
      tags: ['Database', 'Design Patterns', 'Scale'],
      featured: false,
      type: 'Deep Dive'
    }
  ];

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory, resources]);

  const featuredResources = resources.filter(r => r.featured);

  const CategoryIcon = ({ category, className = "w-5 h-5" }) => {
    const cat = categories.find(c => c.id === category);
    const Icon = cat?.icon || BookOpen;
    return <Icon className={className} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              TechHub Platform
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Discover cutting-edge resources, tutorials, and insights for developers, DevOps engineers, and tech enthusiasts.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for tutorials, guides, technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  isActive 
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-purple-500/25` 
                    : 'bg-white/10 backdrop-blur-md text-slate-300 hover:bg-white/20 border border-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Resources */}
        {selectedCategory === 'all' && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Star className="w-8 h-8 text-yellow-400 mr-3" />
              Featured Resources
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <CategoryIcon category={resource.category} className="w-6 h-6 text-purple-400" />
                      <span className="text-sm text-purple-300 font-medium">{resource.type}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{resource.popularity}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {resource.title}
                  </h3>
                  
                  <p className="text-slate-300 mb-4 line-clamp-2">
                    {resource.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {resource.author}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {resource.readTime}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Resources */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <TrendingUp className="w-8 h-8 text-green-400 mr-3" />
              {selectedCategory === 'all' ? 'All Resources' : `${categories.find(c => c.id === selectedCategory)?.name} Resources`}
            </h2>
            <div className="text-slate-400">
              {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No resources found</h3>
              <p className="text-slate-400">Try adjusting your search or category filter</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-102 hover:shadow-xl hover:shadow-purple-500/10"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <CategoryIcon category={resource.category} className="w-5 h-5 text-blue-400" />
                      <span className="text-sm text-blue-300 font-medium">{resource.type}</span>
                    </div>
                    {resource.featured && (
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">
                    {resource.title}
                  </h3>
                  
                  <p className="text-slate-300 text-sm mb-3 line-clamp-2">
                    {resource.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {resource.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                    {resource.tags.length > 2 && (
                      <span className="px-2 py-1 bg-slate-500/20 text-slate-400 text-xs rounded border border-slate-500/30">
                        +{resource.tags.length - 2} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {resource.author}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {resource.readTime}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 mr-1 text-yellow-400" />
                      {resource.popularity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">TechHub Platform</h3>
            <p className="text-slate-400 text-sm">
              Empowering developers with cutting-edge knowledge and resources
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TechPlatform;