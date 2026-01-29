import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Hand,
  Globe,
  MessageCircle,
  Languages,
  ChevronRight,
  Search,
  Sparkles,
  Trophy,
} from 'lucide-react';
import HudPanel from '@/components/ui/HudPanel';
import NeonButton from '@/components/ui/NeonButton';

const courses = [
  {
    id: 'libras',
    title: 'LIBRAS',
    subtitle: 'Brazilian Sign Language',
    icon: Hand,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/50',
    description: 'Master Brazilian Sign Language with AI-powered gesture recognition',
    lessons: 24,
    progress: 35,
  },
  {
    id: 'english',
    title: 'ENGLISH',
    subtitle: 'International Standard',
    icon: Globe,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    borderColor: 'border-secondary/50',
    description: 'Learn English with conversational AI and real-time feedback',
    lessons: 48,
    progress: 60,
  },
  {
    id: 'spanish',
    title: 'SPANISH',
    subtitle: 'Latin American',
    icon: MessageCircle,
    color: 'text-neon-green',
    bgColor: 'bg-neon-green/10',
    borderColor: 'border-neon-green/50',
    description: 'Immersive Spanish learning with native speaker simulation',
    lessons: 36,
    progress: 15,
  },
  {
    id: 'portuguese',
    title: 'PORTUGUESE',
    subtitle: 'Brazilian Variant',
    icon: Languages,
    color: 'text-neon-purple',
    bgColor: 'bg-neon-purple/10',
    borderColor: 'border-neon-purple/50',
    description: 'Perfect your Portuguese with advanced grammar and pronunciation',
    lessons: 32,
    progress: 80,
  },
];

const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];

const TutorMode = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState(2); // B1
  const [customTopic, setCustomTopic] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-4xl font-display font-bold text-neon-cyan mb-2">
          Learning <span className="text-secondary">Hub</span>
        </h1>
        <p className="text-muted-foreground font-mono">
          Select a course to begin your neural training session
        </p>
      </motion.div>

      {/* Level Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <HudPanel>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-secondary" />
              <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                Current Level
              </span>
            </div>
            <span className="text-2xl font-display font-bold text-primary">
              {levels[currentLevel]}
            </span>
          </div>

          {/* Level Bar */}
          <div className="flex items-center gap-2">
            {levels.map((level, index) => (
              <div key={level} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className={`w-full h-3 transition-all duration-300 ${
                    index <= currentLevel
                      ? 'bg-gradient-to-r from-primary to-secondary'
                      : 'bg-muted/50'
                  }`}
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)',
                  }}
                />
                <span
                  className={`text-xs font-mono ${
                    index === currentLevel
                      ? 'text-primary font-bold'
                      : index < currentLevel
                      ? 'text-secondary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {level}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground font-mono">
              Progress to <span className="text-primary">{levels[currentLevel + 1] || 'MASTER'}</span>: 
              <span className="text-foreground ml-1">67%</span>
            </p>
          </div>
        </HudPanel>
      </motion.div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCourse(course.id)}
              className={`w-full p-6 text-left transition-all duration-300 border ${
                selectedCourse === course.id
                  ? `${course.bgColor} ${course.borderColor}`
                  : 'bg-card/50 border-primary/20 hover:border-primary/50'
              }`}
              style={{
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-16 h-16 ${course.bgColor} border ${course.borderColor} flex items-center justify-center`}>
                  <course.icon className={`w-8 h-8 ${course.color}`} />
                </div>
                <ChevronRight className={`w-5 h-5 ${selectedCourse === course.id ? course.color : 'text-muted-foreground'}`} />
              </div>

              {/* Title */}
              <h3 className={`text-2xl font-display font-bold mb-1 ${course.color}`}>
                {course.title}
              </h3>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
                {course.subtitle}
              </p>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4">
                {course.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-mono">
                  {course.lessons} Lessons
                </span>
                <span className={`font-mono ${course.color}`}>
                  {course.progress}% Complete
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 h-1 bg-muted/50 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  className={`h-full ${course.bgColor.replace('/10', '')}`}
                  style={{ backgroundColor: course.color.replace('text-', 'hsl(var(--') + ')' }}
                />
              </div>
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Custom Learning Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <HudPanel 
          title="Custom Learning" 
          icon={<Sparkles className="w-4 h-4" />}
          variant="accent"
        >
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Learn about any topic you want with our AI-powered adaptive learning system.
            </p>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="I want to learn about..."
                className="w-full bg-muted/50 border border-primary/30 pl-12 pr-4 py-4 text-lg font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
                }}
              />
            </div>

            {/* Topic Suggestions */}
            <div className="flex flex-wrap gap-2">
              {['Quantum Physics', 'Machine Learning', 'Music Theory', 'History of Art', 'Cooking Basics'].map((topic) => (
                <button
                  key={topic}
                  onClick={() => setCustomTopic(topic)}
                  className="px-3 py-1.5 bg-muted/30 border border-muted hover:border-primary/50 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>

            <NeonButton 
              variant="primary" 
              className="w-full"
              disabled={!customTopic.trim()}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Start Learning Session
            </NeonButton>
          </div>
        </HudPanel>
      </motion.div>

      {/* Selected Course Action */}
      {selectedCourse && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30"
        >
          <NeonButton variant="primary" size="lg">
            <BookOpen className="w-5 h-5 mr-2" />
            Continue {courses.find((c) => c.id === selectedCourse)?.title} Course
          </NeonButton>
        </motion.div>
      )}
    </div>
  );
};

export default TutorMode;
