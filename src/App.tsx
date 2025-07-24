import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Shield, 
  Zap, 
  Users, 
  BarChart3, 
  TrendingUp,
  Activity,
  Globe,
  Server,
  Database,
  Clock,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import CountUp from 'react-countup';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Live metrics data
const generateMetricsData = () => ({
  systemUptime: Math.random() * 0.5 + 99.5,
  activeUsers: Math.floor(Math.random() * 500) + 2500,
  processingSpeed: Math.random() * 2 + 8,
  dataProcessed: Math.floor(Math.random() * 100) + 1200,
  errorRate: Math.random() * 0.1,
  responseTime: Math.random() * 50 + 150,
});

const chartData = [
  { name: 'Jan', value: 4000, users: 2400 },
  { name: 'Feb', value: 3000, users: 1398 },
  { name: 'Mar', value: 2000, users: 9800 },
  { name: 'Apr', value: 2780, users: 3908 },
  { name: 'May', value: 1890, users: 4800 },
  { name: 'Jun', value: 2390, users: 3800 },
];

const pieData = [
  { name: 'Applications', value: 45, color: '#3b82f6' },
  { name: 'Analytics', value: 30, color: '#10b981' },
  { name: 'Infrastructure', value: 25, color: '#f59e0b' },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [metrics, setMetrics] = useState(generateMetricsData());

  // Update metrics every 3 seconds to simulate live data
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(generateMetricsData());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const MetricWidget = ({ title, value, unit, trend, icon: Icon, color = "blue" }) => {
    const trendIcon = trend > 0 ? ArrowUp : trend < 0 ? ArrowDown : Minus;
    const trendColor = trend > 0 ? "text-green-500" : trend < 0 ? "text-red-500" : "text-gray-500";
    
    return (
      <motion.div 
        className="metric-widget rounded-xl p-6 hover:scale-105 transition-all duration-300"
        whileHover={{ y: -5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <Icon className={`w-8 h-8 text-${color}-500`} />
          <div className={`flex items-center ${trendColor}`}>
            {React.createElement(trendIcon, { className: "w-4 h-4 mr-1" })}
            <span className="text-sm font-medium">{Math.abs(trend).toFixed(1)}%</span>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-slate-600">{title}</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-slate-900">
              <CountUp end={value} decimals={unit === '%' ? 2 : 0} duration={2} />
            </span>
            <span className="text-lg text-slate-500">{unit}</span>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Corporate Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-corporate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-800 to-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Application CoE</h1>
                <p className="text-xs text-slate-600">Center of Excellence</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#overview" className="text-slate-700 hover:text-blue-800 font-medium transition-colors">Overview</a>
              <a href="#metrics" className="text-slate-700 hover:text-blue-800 font-medium transition-colors">Metrics</a>
              <a href="#features" className="text-slate-700 hover:text-blue-800 font-medium transition-colors">Features</a>
              <a href="#benefits" className="text-slate-700 hover:text-blue-800 font-medium transition-colors">Benefits</a>
              <motion.button 
                className="bg-blue-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-900 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-slate-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-white/20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="px-4 py-6 space-y-4">
              <a href="#overview" className="block text-slate-700 font-medium">Overview</a>
              <a href="#metrics" className="block text-slate-700 font-medium">Metrics</a>
              <a href="#features" className="block text-slate-700 font-medium">Features</a>
              <a href="#benefits" className="block text-slate-700 font-medium">Benefits</a>
              <button className="w-full bg-blue-800 text-white px-6 py-3 rounded-lg font-medium">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Corporate Hero Section */}
      <section id="overview" className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <Shield className="w-4 h-4 mr-2" />
                  Enterprise-Grade Solutions
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Application
                  <span className="block text-blue-800">Center of Excellence</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Empowering your organization with cutting-edge business applications, 
                  real-time analytics, and enterprise-grade infrastructure management.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-900 transition-colors flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Platform
                  <ChevronRight className="w-5 h-5 ml-2" />
                </motion.button>
                <motion.button 
                  className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-blue-800 hover:text-blue-800 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Documentation
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-corporate rounded-2xl p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">System Overview</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-slate-600">Live</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-800">
                      <CountUp end={metrics.activeUsers} duration={2} />
                    </div>
                    <div className="text-sm text-slate-600">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      <CountUp end={metrics.systemUptime} decimals={2} duration={2} />%
                    </div>
                    <div className="text-sm text-slate-600">Uptime</div>
                  </div>
                </div>

                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#1e40af" 
                        fill="url(#gradient)" 
                        strokeWidth={2}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Metrics Dashboard */}
      <section id="metrics" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Live Performance Metrics</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Real-time insights into your application ecosystem performance and business impact
            </p>
          </motion.div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <MetricWidget
              title="System Uptime"
              value={metrics.systemUptime}
              unit="%"
              trend={0.2}
              icon={Server}
              color="green"
            />
            <MetricWidget
              title="Active Users"
              value={metrics.activeUsers}
              unit=""
              trend={12.5}
              icon={Users}
              color="blue"
            />
            <MetricWidget
              title="Processing Speed"
              value={metrics.processingSpeed}
              unit="x faster"
              trend={-2.1}
              icon={Zap}
              color="yellow"
            />
            <MetricWidget
              title="Data Processed"
              value={metrics.dataProcessed}
              unit="TB"
              trend={8.7}
              icon={Database}
              color="purple"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Performance Trend */}
            <motion.div 
              className="lg:col-span-2 metric-widget rounded-xl p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Performance Trends</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">Applications</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">Users</span>
                  </div>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Resource Distribution */}
            <motion.div 
              className="metric-widget rounded-xl p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Resource Distribution</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-slate-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-slate-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Additional Metrics */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <motion.div 
              className="metric-widget rounded-xl p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Activity className="w-8 h-8 text-red-500 mx-auto mb-4" />
              <div className="text-2xl font-bold text-slate-900">
                <CountUp end={metrics.errorRate} decimals={3} duration={2} />%
              </div>
              <div className="text-sm text-slate-600">Error Rate</div>
            </motion.div>

            <motion.div 
              className="metric-widget rounded-xl p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-4" />
              <div className="text-2xl font-bold text-slate-900">
                <CountUp end={metrics.responseTime} duration={2} />ms
              </div>
              <div className="text-sm text-slate-600">Avg Response Time</div>
            </motion.div>

            <motion.div 
              className="metric-widget rounded-xl p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Globe className="w-8 h-8 text-green-500 mx-auto mb-4" />
              <div className="text-2xl font-bold text-slate-900">
                <CountUp end={47} duration={2} />
              </div>
              <div className="text-sm text-slate-600">Global Regions</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Corporate Features Section */}
      <section id="features" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Enterprise Capabilities</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive suite of business applications designed for organizational excellence
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Advanced Analytics</h3>
                    <p className="text-slate-600">Real-time business intelligence with predictive insights and automated reporting capabilities.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-green-800" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Enterprise Security</h3>
                    <p className="text-slate-600">Bank-grade security with multi-factor authentication, encryption, and compliance management.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-purple-800" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">High Performance</h3>
                    <p className="text-slate-600">Optimized infrastructure delivering 10x faster processing with 99.9% uptime guarantee.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div 
                className="rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '400px'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 flex items-center justify-center">
                  <div className="text-center text-white">
                    <TrendingUp className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Business Intelligence</h3>
                    <p className="text-blue-100">Powered by AI & Machine Learning</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Corporate Benefits Section */}
      <section id="benefits" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div 
                className="rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '500px'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-4">Organizational Benefits</h2>
                <p className="text-xl text-slate-600">
                  Transform your business operations with measurable improvements across all key metrics
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { text: "Reduce operational costs by up to 40%", checked: true },
                  { text: "Increase team productivity by 3x", checked: true },
                  { text: "Improve decision-making speed by 60%", checked: true },
                  { text: "Enhance data accuracy to 99.9%", checked: true },
                  { text: "Streamline compliance reporting", checked: true },
                  { text: "Enable real-time collaboration", checked: true }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-lg text-slate-700">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button 
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-900 transition-colors flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Demo
                <ChevronRight className="w-5 h-5 ml-2" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Corporate CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-white">
              Ready to Transform Your Organization?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join leading enterprises who trust our Application Center of Excellence 
              to drive their digital transformation initiatives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="bg-white text-blue-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial
              </motion.button>
              <motion.button 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Sales
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Corporate Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">Application CoE</span>
              </div>
              <p className="text-slate-400">
                Empowering organizations with enterprise-grade business applications and analytics.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Business Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Process Automation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data Management</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance Tools</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Practices</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support Center</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Application Center of Excellence. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;