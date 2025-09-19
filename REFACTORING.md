# Resume-Driven Website Refactoring

## ✅ **Problem Solved**

Your **resume is now the single source of truth**. Update your LaTeX resume files and your website automatically updates.

## 🔧 **How It Works**

### **1. Resume Parser**
- **`/client/src/utils/resumeParser.js`** reads your existing LaTeX resume files
- Extracts work experience, skills, and formats them for the website
- No duplicate data entry needed

### **2. API Integration**
- **Server endpoints** (`/api/resume-experience`, `/api/resume-skills`) serve your resume content
- **React components** fetch and parse this data on load

### **3. Updated Components**
- **Work page** now loads experience from `/resume/resume/experience.tex`
- **About page** now loads skills from `/resume/resume/skills.tex`
- Both show loading states while fetching resume data

## 📝 **Your Workflow Now**

1. **Update your resume** in `/resume/resume/experience.tex` or `/resume/resume/skills.tex`
2. **Save the file** - that's it!
3. **Website automatically** reflects your changes on next visit
4. **No code changes** needed for content updates

## 🎯 **Key Benefits**

✅ **Single source of truth** - Resume drives everything  
✅ **No duplicate data** - Maintain content in one place  
✅ **Automatic sync** - Website updates when resume changes  
✅ **Keep existing workflow** - Continue using LaTeX for resume  

## 🔍 **What Changed**

- **Added**: Resume parser utility
- **Added**: API endpoints to serve resume data  
- **Updated**: Work and About pages to use dynamic resume data
- **Removed**: Duplicate hardcoded data in components

## 🚀 **Next Time You Update Your Experience**

Just edit `/resume/resume/experience.tex` and add your new role using the same LaTeX format you already use. The website will automatically pick it up and display it in the timeline.

**That's it!** No more maintaining data in multiple places.
