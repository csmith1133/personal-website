// Parse existing resume LaTeX files to feed website data
// This makes the resume the single source of truth

// Parse LaTeX experience file
export const parseExperience = (experienceText) => {
  const entries = [];
  let currentCompany = null;
  let currentLocation = null;
  
  // Split by \cventry blocks
  const entryBlocks = experienceText.split('\\cventry');
  
  for (let i = 1; i < entryBlocks.length; i++) { // Skip first empty block
    const block = entryBlocks[i];
    
    // Extract job title, organization, location, dates
    const titleMatch = block.match(/\{([^}]+)\}\s*%\s*Job title/);
    const orgMatch = block.match(/\{([^}]*)\}\s*%\s*Organization/);
    const locationMatch = block.match(/\{([^}]*)\}\s*%\s*Location/);
    const dateMatch = block.match(/\{([^}]+)\}\s*%\s*Date/);
    
    if (titleMatch && dateMatch) {
      const title = titleMatch[1];
      const org = orgMatch ? orgMatch[1].trim() : '';
      const location = locationMatch ? locationMatch[1].trim() : '';
      const period = dateMatch[1];
      
      // If we have an organization, this starts a new company
      if (org && org !== '') {
        currentCompany = org;
        currentLocation = location;
      }
      
      // Extract responsibilities
      const responsibilities = [];
      const itemMatches = block.match(/\\item\s*\{([^}]+)\}/g);
      if (itemMatches) {
        itemMatches.forEach(match => {
          const responsibility = match.replace(/\\item\s*\{/, '').replace(/\}$/, '');
          // Clean up LaTeX formatting
          const cleanResponsibility = responsibility
            .replace(/\\\$/g, '$')
            .replace(/\\&/g, '&')
            .replace(/\\%/g, '%')
            .replace(/\\\\/g, '\\')
            .trim();
          responsibilities.push(cleanResponsibility);
        });
      }
      
      // Also clean up the title for LaTeX formatting
      const cleanTitle = title
        .replace(/\\\$/g, '$')
        .replace(/\\&/g, '&')
        .replace(/\\%/g, '%')
        .replace(/\\\\/g, '\\')
        .trim();
      
      entries.push({
        title: cleanTitle,
        company: currentCompany,
        location: currentLocation,
        period,
        responsibilities
      });
    }
  }
  
  return entries;
};

// Parse LaTeX skills file  
export const parseSkills = (skillsText) => {
  const skillCategories = [];
  
  // Split by \cvskill blocks - handle multiline format
  const skillBlocks = skillsText.split('\\cvskill');
  
  for (let i = 1; i < skillBlocks.length; i++) {
    const block = skillBlocks[i];
    
    // Extract category and skills - handle multiline format
    const lines = block.split('\n').map(line => line.trim());
    let category = '';
    let skillsString = '';
    
    for (const line of lines) {
      // Look for category line: {Data Analysis \& BI} % Category
      const categoryMatch = line.match(/^\{([^}]+)\}\s*%\s*Category/);
      if (categoryMatch) {
        category = categoryMatch[1]
          .replace(/\\\$/g, '$')
          .replace(/\\&/g, '&')
          .replace(/\\%/g, '%')
          .replace(/\\\\/g, '\\')
          .trim();
      }
      
      // Look for skills line: {SQL, Python, ...} % Skills
      const skillsMatch = line.match(/^\{([^}]+)\}\s*%\s*Skills/);
      if (skillsMatch) {
        skillsString = skillsMatch[1];
      }
    }
    
    if (category && skillsString) {
        // Split skills by comma and clean up
        const technologies = skillsString
          .split(',')
          .map(skill => skill.trim()
            .replace(/\\\$/g, '$')
            .replace(/\\&/g, '&')
            .replace(/\\%/g, '%')
            .replace(/\\\\/g, '\\'))
          .filter(skill => skill.length > 0);
      
      skillCategories.push({
        category,
        technologies
      });
    }
  }
  
  return skillCategories;
};

// Group experience entries by company for timeline display
export const groupExperienceByCompany = (entries) => {
  const companies = new Map();
  
  entries.forEach(entry => {
    if (!companies.has(entry.company)) {
      companies.set(entry.company, {
        company: entry.company,
        location: entry.location,
        type: 'work',
        roles: []
      });
    }
    
    companies.get(entry.company).roles.push({
      title: entry.title,
      period: entry.period,
      achievements: entry.responsibilities.map(resp => {
        // Create shorter versions for website display
        if (resp.length > 100) {
          const sentences = resp.split('.');
          return sentences[0] + (sentences.length > 1 ? '.' : '');
        }
        return resp;
      })
    });
  });
  
  return Array.from(companies.values());
};

// Parse LaTeX certificates file
export const parseCertificates = (certificatesText) => {
  const certificates = [];
  
  // Split by \cvhonor blocks to handle multiline formatting
  const honorBlocks = certificatesText.split('\\cvhonor');
  
  for (let i = 1; i < honorBlocks.length; i++) {
    const block = honorBlocks[i];
    
    // Extract the four main parts: Name, Issuer, Credential ID, Date
    // Pattern: {Name} % Name
    //          {Issuer} % Issuer  
    //          {Credential ID} % Credential ID
    //          {Date} % Date(s)
    
    const lines = block.split('\n').map(line => line.trim());
    const parts = [];
    
    // Extract content within braces
    for (const line of lines) {
      const braceMatch = line.match(/^\{([^}]*)\}/);
      if (braceMatch) {
        parts.push(braceMatch[1].trim());
      }
    }
    
    // We expect 4 parts: name, issuer, credentialId, date
    if (parts.length >= 4) {
      certificates.push({
        title: parts[0],
        issuer: parts[1], 
        credentialId: parts[2],
        period: parts[3],
        date: parts[3]
      });
    } else if (parts.length === 3) {
      // Handle case where credential ID might be empty
      certificates.push({
        title: parts[0],
        issuer: parts[1],
        credentialId: '',
        period: parts[2],
        date: parts[2]
      });
    }
  }
  
  return certificates;
};

// Parse LaTeX education file
export const parseEducation = (educationText) => {
  const education = [];
  
  // Split by \cventry blocks
  const entryBlocks = educationText.split('\\cventry');
  
  for (let i = 1; i < entryBlocks.length; i++) {
    const block = entryBlocks[i];
    
    // Extract degree, institution, location, dates
    const degreeMatch = block.match(/\{([^}]+)\}\s*%\s*Degree/);
    const institutionMatch = block.match(/\{([^}]+)\}\s*%\s*Institution/);
    const locationMatch = block.match(/\{([^}]+)\}\s*%\s*Location/);
    const dateMatch = block.match(/\{([^}]+)\}\s*%\s*Date/);
    
    if (degreeMatch && institutionMatch && dateMatch) {
      // Extract achievements/items
      const achievements = [];
      const itemMatches = block.match(/\\item\s*\{([^}]+)\}/g);
      if (itemMatches) {
        itemMatches.forEach(match => {
          const achievement = match.replace(/\\item\s*\{/, '').replace(/\}$/, '');
          // Clean up LaTeX formatting
          const cleanAchievement = achievement
            .replace(/\\\$/g, '$')
            .replace(/\\&/g, '&')
            .replace(/\\%/g, '%')
            .replace(/\\\\/g, '\\')
            .trim();
          achievements.push(cleanAchievement);
        });
      }
      
      education.push({
        degree: degreeMatch[1].trim(),
        institution: institutionMatch[1].trim(),
        location: locationMatch[1].trim(),
        period: dateMatch[1].trim(),
        achievements
      });
    }
  }
  
  return education;
};

// Create timeline data for Work page
export const createTimelineFromResume = (experienceEntries, certificates = [], education = []) => {
  const companies = groupExperienceByCompany(experienceEntries);
  const timeline = [];
  
  companies.forEach(company => {
    // Calculate year range from roles - fix the logic
    const years = company.roles.map(role => {
      // Handle various date formats: "May 2021", "Feb. 2019 - Feb. 2021", "Jan 2024 - Present"
      const period = role.period.trim();
      
      let startYear = 2020; // fallback
      let endYear = 2020; // fallback - don't default to current year
      
      // Try to match full period first: "Feb. 2019 - Feb. 2021" or "May 2021 - April 2022"
      const fullPeriodMatch = period.match(/(\w+\.?)\s+(\d{4})\s*-\s*(?:(\w+\.?)\s+(\d{4})|Present)/);
      if (fullPeriodMatch) {
        startYear = parseInt(fullPeriodMatch[2]);
        if (fullPeriodMatch[4]) {
          endYear = parseInt(fullPeriodMatch[4]);
        } else {
          // Present
          endYear = new Date().getFullYear();
        }
      } else {
        // Try to match single date format: "May 2021"
        const singleDateMatch = period.match(/(\w+\.?)\s+(\d{4})/);
        if (singleDateMatch) {
          startYear = parseInt(singleDateMatch[2]);
          endYear = startYear; // Same year for single date
        }
      }
      
      return { start: startYear, end: endYear };
    });
    
    const minYear = Math.min(...years.map(y => y.start));
    const maxYear = Math.max(...years.map(y => y.end));
    
    // Fix: Only show "Present" if the latest role actually ends with "Present"
    const hasPresent = company.roles.some(role => role.period.includes('Present'));
    const yearRange = hasPresent ? 
      `${minYear} - Present` : 
      `${minYear} - ${maxYear}`;
    
    // Create description based on roles
    const roleCount = company.roles.length;
    const description = roleCount > 1 ? 
      `Progressive advancement across ${roleCount} roles focusing on data analysis, project management, and operational excellence.` :
      `Professional experience in ${company.roles[0].title.toLowerCase()}.`;
    
    timeline.push({
      year: yearRange,
      company: company.company,
      description,
      type: 'work',
      roles: company.roles
    });
  });
  
  // Add certificates
  if (certificates.length > 0) {
    // Calculate year range from certificates
    const certYears = certificates.map(cert => {
      const yearMatch = cert.period.match(/(\d{4})/);
      return yearMatch ? parseInt(yearMatch[1]) : 2023;
    });
    
    const minCertYear = Math.min(...certYears);
    const maxCertYear = Math.max(...certYears);
    const certYearRange = minCertYear === maxCertYear ? `${minCertYear}` : `${minCertYear} - ${maxCertYear}`;
    
    timeline.push({
      year: certYearRange,
      company: 'Professional Certifications',
      description: 'Achieved key professional certifications in project management and data analytics.',
      type: 'certification',
      roles: certificates.map(cert => ({
        title: cert.title,
        period: cert.period,
        achievements: [cert.issuer, cert.credentialId ? `Credential ID: ${cert.credentialId}` : 'Professional certification demonstrating expertise and knowledge']
      }))
    });
  }
  
  // Add education
  education.forEach(edu => {
    timeline.push({
      year: edu.period,
      company: edu.institution,
      description: edu.institution === 'University of Northern Colorado' ?
        'Foundational education in teaching and pedagogy, developing leadership skills through competitive athletics at the Division 1 level.' :
        'Advanced studies in applied technology and training development.',
      type: 'education',
      roles: [{
        title: edu.degree,
        period: edu.period,
        achievements: [...edu.achievements, edu.location]
      }]
    });
  });
  
  // Sort timeline by priority (Present first, then by start year descending)
  timeline.sort((a, b) => {
    const aHasPresent = a.year.includes('Present');
    const bHasPresent = b.year.includes('Present');
    
    // If one has "Present" and the other doesn't, prioritize the one with "Present"
    if (aHasPresent && !bHasPresent) return -1;
    if (!aHasPresent && bHasPresent) return 1;
    
    // If both have "Present" or both don't have "Present", sort by start year
    const getStartYear = (yearString) => {
      // Handle formats like "2019 - 2021", "2021 - Present", "2023", etc.
      const yearMatch = yearString.match(/(\d{4})/);
      return yearMatch ? parseInt(yearMatch[1]) : 0;
    };
    
    const aStart = getStartYear(a.year);
    const bStart = getStartYear(b.year);
    
    // Sort in descending order (most recent first)
    return bStart - aStart;
  });
  
  return timeline;
};
