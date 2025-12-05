export interface Insight {
    title: string;
    description: string;
    icon: string;
    type: 'alert' | 'trend' | 'comfort' | 'summary';
}
