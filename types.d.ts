type ReportTypes = {
  id: string;
  location: string;
  category: string;
  photoUrl: string[];
  title: string;
  date: {
    nanoseconds: number;
    seconds: number;
  };
  description: string;
};

type Trends = {
  title: string;
  excert: string;
  author: {
    avatar: string;
    name: string;
  };
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  description: string;
  id: string;
  photoUrl: string[];
  tag: string;
};
