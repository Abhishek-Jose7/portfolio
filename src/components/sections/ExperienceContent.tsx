"use client"

import { Timeline } from "@/components/ui/timeline"
import portfolioData from "@/lib/portfolio-data.json"

export function ExperienceContent() {
  // Different images for each experience entry
  const experienceImages = [
    // 2025 - GDSC CRCE Technical Associate
    [
      "/time/20251.jpg",
      "/time/20252.jpg",
      "/time/20253.jpg",
    ],
    // 2020 - GDSC CRCE Workforce Member
    [
      '/time/20241.jpg',
      '/time/20242.jpg',],
    // 2019 - StartupHub Junior Developer
    [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop"
    ]
  ];

  // Experience data is already in correct order (2025 first)
  const timelineData = portfolioData.experience.map((exp, index) => {
    const year = exp.startDate.split(' ')[1] || exp.startDate.substring(0, 4);
    const displayYear = index === 0 ? year : index === 1 ? year : `${year}--`;
    const images = experienceImages[index] || experienceImages[0];
    
    return {
      title: displayYear,
      content: (
        <div className="space-y-6">
          {/* Title */}
          <div>
            <h3 className="text-2xl font-bold mb-2">{exp.position}</h3>
            <p className="text-primary font-medium text-lg">{exp.company}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {exp.startDate} - {exp.current ? 'Present' : exp.endDate} • {exp.location}
            </p>
            {exp.current && (
              <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                Current Role
              </span>
            )}
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img 
              src={images[0]} 
              alt={`${exp.company} workspace`}
              className="w-full h-64 object-cover rounded-lg"
            />
            <img 
              src={images[1]} 
              alt={`${exp.company} team`}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
          
          {/* Key Achievements */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Key Achievements:</h4>
            <ul className="space-y-2">
              {exp.achievements.map((achievement: string, idx: number) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-3">
                  <span className="text-primary text-lg mt-0.5">•</span>
                  <span className="flex-1">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Technologies */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech: string) => (
                <span key={tech} className="px-3 py-1.5 text-sm rounded-full bg-muted hover:bg-muted/80 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      ),
    };
  });

  return (
    <div className="pb-20">
      <Timeline data={timelineData} />
    </div>
  );
}
