
import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { ActionCard } from "@/components/ActionCard";
import { FeatureCard } from "@/components/FeatureCard";
import { BookOpen, FileText, GraduationCap, Upload, FileEdit, BarChart3, BrainCircuit, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { TranslateText } from "@/components/TranslateText";
import { LanguageDemo } from "@/components/LanguageDemo";

const Index = () => {
  const [stats, setStats] = useState({
    materialsUploaded: 0,
    flashcardSets: 0,
    quizzesTaken: 0,
    smartNotes: 0
  });
  
  const [learningProgress, setLearningProgress] = useState({
    overall: 0,
    biology: 65,
    chemistry: 42,
    history: 78
  });
  
  const navigate = useNavigate();
  
  // Load statistics from localStorage
  useEffect(() => {
    const loadStats = () => {
      const materialsUploaded = parseInt(localStorage.getItem('studygenius_materialsUploaded') || '0');
      const flashcardSets = parseInt(localStorage.getItem('studygenius_flashcardSets') || '0');
      const quizzesTaken = parseInt(localStorage.getItem('studygenius_quizzesTaken') || '0');
      const smartNotes = parseInt(localStorage.getItem('studygenius_smartNotes') || '0');
      
      setStats({
        materialsUploaded,
        flashcardSets,
        quizzesTaken,
        smartNotes
      });

      // Calculate overall learning progress as average of available stats
      const totalItems = materialsUploaded + flashcardSets + quizzesTaken + smartNotes;
      const overallProgress = totalItems > 0 ? 
        Math.min(Math.floor((totalItems / 20) * 100), 100) : 0;
      
      setLearningProgress(prev => ({
        ...prev,
        overall: overallProgress
      }));
    };

    // Load stats initially
    loadStats();
    
    // Set up event listener for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && e.key.startsWith('studygenius_')) {
        loadStats();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event listener for local updates
    const handleLocalUpdate = () => loadStats();
    window.addEventListener('studygenius_stats_updated', handleLocalUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('studygenius_stats_updated', handleLocalUpdate);
    };
  }, []);
  
  const handleUploadClick = () => {
    navigate('/upload');
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-studygenius-primary">Welcome to StudyBuddy</h1>
          <button 
            onClick={handleUploadClick}
            className="flex items-center gap-2 bg-studygenius-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            <Upload className="h-5 w-5" />
            <span>Upload Content</span>
          </button>
        </div>

        {/* Stats section - Moved up as requested */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            icon={<BookOpen className="h-10 w-10" />} 
            title="Materials Uploaded" 
            value={stats.materialsUploaded} 
            iconColor="text-studygenius-primary"
          />
          <StatCard 
            icon={<FileText className="h-10 w-10" />} 
            title="Flashcard Sets" 
            value={stats.flashcardSets} 
            iconColor="text-studygenius-teal"
          />
          <StatCard 
            icon={<GraduationCap className="h-10 w-10" />} 
            title="Exams Taken" 
            value={stats.quizzesTaken} 
            iconColor="text-studygenius-purple"
          />
          <StatCard 
            icon={<FileEdit className="h-10 w-10" />} 
            title="Revision Notes" 
            value={stats.smartNotes} 
            iconColor="text-studygenius-tan"
          />
        </div>

        {/* Learning Progress Section - Moved to after stats */}
        <div className="bg-gradient-to-br from-[#feb47b] to-pastel-peach p-6 rounded-xl shadow-sm mb-8 border border-studygenius-lightblue/20">
          <h2 className="text-xl font-bold text-studygenius-primary mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Learning Progress
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-medium">{learningProgress.overall}%</span>
              </div>
              <Progress value={learningProgress.overall} className="h-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Biology</span>
                  <span className="text-sm font-medium">{learningProgress.biology}%</span>
                </div>
                <Progress value={learningProgress.biology} className="h-2 bg-pastel-blue/50" indicatorClassName="bg-studygenius-teal" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Chemistry</span>
                  <span className="text-sm font-medium">{learningProgress.chemistry}%</span>
                </div>
                <Progress value={learningProgress.chemistry} className="h-2 bg-pastel-purple/50" indicatorClassName="bg-studygenius-purple" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">History</span>
                  <span className="text-sm font-medium">{learningProgress.history}%</span>
                </div>
                <Progress value={learningProgress.history} className="h-2 bg-pastel-peach/50" indicatorClassName="bg-studygenius-tan" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions - Moved after the learning progress */}
        <h2 className="text-2xl font-bold mb-6 text-studygenius-primary">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <ActionCard 
            icon={<FileText className="h-12 w-12" />}
            title="Generate Flashcards"
            description="Create flashcards from your uploaded content"
            path="/flashcards"
            bgColor="bg-studygenius-teal"
          />
          <ActionCard 
            icon={<GraduationCap className="h-12 w-12" />}
            title="Exam Mode"
            description="Test your knowledge with adaptive tests"
            path="/quizzes"
            bgColor="bg-studygenius-primary"
          />
          <ActionCard 
            icon={<FileEdit className="h-12 w-12" />}
            title="Revision Mode"
            description="Enhance and review your notes"
            path="/smart-notes"
            bgColor="bg-[#feb47b]"
          />
        </div>

        {/* Language Demo */}
        <div className="mb-10">
          <LanguageDemo />
        </div>

        {/* Features - Keep at bottom */}
        <h2 className="text-2xl font-bold mb-6 text-studygenius-primary">Learning Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <FeatureCard 
            title={<TranslateText text="AI-Enhanced Questions" />}
            description={<TranslateText text="Advanced questions tailored to your learning materials and progress" />}
            icon={<BrainCircuit className="h-8 w-8" />}
            iconColor="text-studygenius-purple"
          />
          <FeatureCard 
            title={<TranslateText text="Progress Tracking" />}
            description={<TranslateText text="Monitor your learning journey with detailed statistics" />}
            icon={<BarChart3 className="h-8 w-8" />}
            iconColor="text-studygenius-primary"
          />
          <FeatureCard 
            title={<TranslateText text="Interactive Revision" />}
            description={<TranslateText text="Turn your notes into active learning tools" />}
            icon={<FileEdit className="h-8 w-8" />}
            iconColor="text-[#feb47b]"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
