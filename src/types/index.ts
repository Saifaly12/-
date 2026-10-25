export type ScreenRoute =
  | 'overview'
  | 'student-dashboard'
  | 'educational-units'
  | 'unit-learning-experience'
  | 'interactive-quizzes'
  | 'assessment-results';

export type UnitStatus = 'completed' | 'in_progress' | 'locked';

export interface EducationalUnit {
  id: number;
  numberStr: string;
  title: string;
  subtitle: string;
  description: string;
  status: UnitStatus;
  progressPercent: number;
  skillsCount: number;
  hasVideo: boolean;
  hasQuiz: boolean;
  quizScore?: number;
  estimatedMinutes: number;
  imageUrl?: string;
  category: string;
  keywords: string;
  prerequisite?: string;
}

export interface QuizOption {
  id: 'a' | 'b' | 'c' | 'd';
  label: string;
  text: string;
  colorClass: string;
  shadowColor: string;
  iconName: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: number;
  unitId: number;
  unitTitle: string;
  domain: string;
  subDomain: string;
  questionText: string;
  hintText: string;
  diagramImageUrl?: string;
  diagramBadge?: string;
  diagramFormula?: string;
  options: QuizOption[];
  explanation: string;
  masteredSkill: string;
  points: number;
}

export interface AssessmentRecord {
  id: number;
  unitId: number;
  unitTitle: string;
  targetSkill: string;
  cognitiveScore: number;
  maxCognitiveScore: number;
  practicalPercentage: number;
  performanceLevel: 'ممتاز' | 'جيد جداً' | 'تدريب إضافي';
  evaluationDate: string;
  recommendedAction: string;
  actionButtonLabel?: string;
}

export interface TrainingLog {
  id: number;
  title: string;
  meta: string;
  accuracyOrStatus: string;
  icon: string;
  colorType: 'primary' | 'secondary' | 'tertiary';
}

export interface SupervisorFeedback {
  supervisorName: string;
  title: string;
  timeAgo: string;
  comment: string;
  tag: string;
  linkText: string;
}
