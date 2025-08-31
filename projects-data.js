// projects-data.js v4
export const projects = [
  {
    slug: "target-analysis",
    title: "Target Analysis",
    summary: "Three-statement model and DCF evaluating growth, margins, and valuation drivers.",
    tags: ["Excel", "Valuation", "Credit"],
    cover: "projects/Target-Excels/Screenshot 2025-08-29 015347.png",
    images: [
      "projects/Target-Excels/Screenshot 2025-08-29 015347.png",
      "projects/Target-Excels/Screenshot 2025-08-29 015404.png",
      "projects/Target-Excels/Screenshot 2025-08-29 015412.png"
    ],
    downloads: [
      {
        name: "Target Analysis",
        file: "projects/Target-Excels/Target Analysis.xlsx",
        description: "Comprehensive financial analysis model"
      },
      {
        name: "Target DCF",
        file: "projects/Target-Excels/Target DCF.xlsx",
        description: "Discounted cash flow valuation model"
      }
    ],
    details: `
      <div class="project-details">
        <h2>Target Analysis - Financial Modeling Project</h2>
        
        <section class="project-section">
          <h3>Overview</h3>
          <p>Comprehensive financial analysis of Target Corporation using advanced Excel modeling techniques. This project demonstrates proficiency in financial statement analysis, valuation methodologies, and credit risk assessment.</p>
        </section>

        <section class="project-section">
          <h3>Key Components</h3>
          <ul>
            <li><strong>Three-Statement Model:</strong> Integrated income statement, balance sheet, and cash flow statement with dynamic forecasting</li>
            <li><strong>DCF Valuation:</strong> Discounted cash flow analysis with sensitivity analysis and scenario modeling</li>
            <li><strong>Credit Analysis:</strong> Comprehensive credit risk assessment including leverage ratios and coverage metrics</li>
            <li><strong>Growth Projections:</strong> Revenue and margin forecasting based on industry trends and company-specific factors</li>
          </ul>
        </section>

        <section class="project-section">
          <h3>Technical Skills Demonstrated</h3>
          <ul>
            <li>Advanced Excel functions and financial modeling</li>
            <li>Financial statement analysis and interpretation</li>
            <li>Valuation methodologies (DCF, comparable company analysis)</li>
            <li>Risk assessment and scenario analysis</li>
            <li>Industry research and competitive analysis</li>
          </ul>
        </section>

        <section class="project-section">
          <h3>Outcomes</h3>
          <p>Delivered comprehensive valuation report with detailed financial projections, risk assessment, and investment recommendations. The model successfully identified key value drivers and provided actionable insights for investment decision-making.</p>
        </section>
      </div>
    `
  },
  {
    slug: "fund-dashboard",
    title: "Power BI Dashboard",
    summary: "Interactive Power BI dashboard featuring financial analytics, KPI tracking, and data visualizations with dynamic charts and filters.",
    tags: ["Power BI", "Data Modeling", "ETL"],
    cover: "projects/PowerBI-Project/Screenshot 2025-08-29 200547.png",
    images: [
      "projects/PowerBI-Project/Screenshot 2025-08-29 200547.png",
      "projects/PowerBI-Project/Screenshot 2025-08-29 200708.png"
    ],
    downloads: [
      {
        name: "Power BI Dashboard",
        file: "projects/PowerBI-Project/Power BI Dashboard - Melvin.pbix",
        description: "Complete Power BI dashboard file with data models and visualizations"
      }
    ],
    details: `
      <div class="project-details">
        <h2>Power BI Dashboard - Financial Analytics Project</h2>
        
        <section class="project-section">
          <h3>Overview</h3>
          <p>Interactive Power BI dashboard showcasing advanced data visualization and analytics capabilities. The dashboard demonstrates proficiency in data modeling, DAX formulas, and creating insightful business intelligence solutions for financial analysis and reporting.</p>
        </section>

        <section class="project-section">
          <h3>Dashboard Features</h3>
          <ul>
            <li><strong>Dynamic Visualizations:</strong> Interactive charts, graphs, and KPI cards with drill-down capabilities</li>
            <li><strong>Financial Metrics:</strong> Comprehensive tracking of key performance indicators and financial ratios</li>
            <li><strong>Data Filtering:</strong> Interactive slicers and filters for dynamic data exploration</li>
            <li><strong>Trend Analysis:</strong> Time-series charts showing performance trends and patterns</li>
            <li><strong>Professional Layout:</strong> Clean, intuitive design with consistent branding and formatting</li>
          </ul>
        </section>

        <section class="project-section">
          <h3>Technical Skills Demonstrated</h3>
          <ul>
            <li>Power BI Desktop development and report design</li>
            <li>DAX (Data Analysis Expressions) for calculated measures and columns</li>
            <li>Data modeling and relationship management</li>
            <li>Advanced chart types and custom visualizations</li>
            <li>Interactive dashboard design and user experience optimization</li>
            <li>Data transformation and cleaning techniques</li>
          </ul>
        </section>

        <section class="project-section">
          <h3>Key Learnings</h3>
          <p>This project enhanced my expertise in business intelligence tools and data visualization best practices. It demonstrates the ability to transform raw data into actionable insights through compelling visual storytelling and interactive analytics.</p>
        </section>
      </div>
    `
  },
  {
    slug: "public-markets-dashboard",
    title: "Public Markets Dashboard",
    summary: "A modern Next.js/TypeScript Public Markets Dashboard that surfaces what moves markets at a glance. The Home view combines a live yfinance-powered chart and watchlist, a transparent sentiment score (news tone + breadth), a Political Pulse panel of policy headlines, and a concise Big Picture summary.",
    tags: ["Cursor", "GPT-5", "Next.js/TypeScript"],
    githubUrl: "https://github.com/MelvinFernandez/Public-Markets-Dashboard",
    cover: "projects/Public-Markets/image.png",
    images: [
      "projects/Public-Markets/image.png",
      "projects/Public-Markets/Screenshot 2025-08-28 001549.png",
      "projects/Public-Markets/Screenshot 2025-08-30 215132.png",
      "projects/Public-Markets/Screenshot 2025-08-31 033450.png",
      "projects/Public-Markets/Screenshot 2025-08-31 033459.png"
    ],
    details: `
      <div class="project-details">
        <h2>Public Markets Dashboard - Next.js/TypeScript Project</h2>
        
        <section class="project-section">
          <h3>Overview</h3>
          <p>Modern, responsive web application built with Next.js and TypeScript that provides comprehensive market intelligence and real-time financial data visualization. The dashboard aggregates multiple data sources to deliver actionable insights for investment professionals and market analysts.</p>
        </section>

        <section class="project-section">
          <h3>Core Features</h3>
          <ul>
            <li><strong>Live Market Data:</strong> Real-time stock prices, charts, and watchlists powered by yfinance API integration</li>
            <li><strong>Sentiment Analysis:</strong> AI-powered sentiment scoring based on news tone and breadth analysis across multiple sources</li>
            <li><strong>Political Pulse:</strong> Curated feed of policy headlines and regulatory developments that impact markets</li>
            <li><strong>Big Picture Summary:</strong> Concise market overview with key themes and trends</li>
            <li><strong>Interactive Charts:</strong> Responsive financial charts with technical indicators and drawing tools</li>
          </ul>
        </section>

        <section class="project-section">
          <h3>Technical Architecture</h3>
          <ul>
            <li><strong>Frontend:</strong> Next.js 13+ with App Router, TypeScript for type safety</li>
            <li><strong>Styling:</strong> Tailwind CSS with custom design system and dark theme</li>
            <li><strong>Charts:</strong> Chart.js or D3.js for interactive financial visualizations</li>
            <li><strong>Data Integration:</strong> RESTful APIs, WebSocket connections for real-time updates</li>
            <li><strong>State Management:</strong> React Context API or Zustand for global state</li>
          </ul>
        </section>

        <section class="project-section">
          <h3>Development Process</h3>
          <p>Built using modern development practices including AI-assisted coding with Cursor and GPT-5, ensuring code quality and best practices. The project demonstrates proficiency in full-stack web development, financial data integration, and responsive design principles.</p>
        </section>

        <section class="project-section">
          <h3>Future Enhancements</h3>
          <ul>
            <li>Machine learning models for predictive analytics</li>
            <li>Advanced portfolio management tools</li>
            <li>Real-time news sentiment scoring</li>
            <li>Mobile application development</li>
            <li>Integration with additional financial data providers</li>
          </ul>
        </section>
      </div>
    `
  }
];

export function getProjectBySlug(slug) {
  return projects.find(project => project.slug === slug);
}
