module.exports = {
    daisyui: {
      themes: [
        {
          mytheme: {
  
            "primary": "#00b0ff",
  
            "secondary": "#008ff2",
  
            "accent": "#0000ff",
  
            "neutral": "#0e0d09",
  
            "base-100": "#27293f",
  
            "info": "#00dfff",
  
            "success": "#709b00",
  
            "warning": "#d25800",
  
            "error": "#e1064e",
          },
        },
      ],
    },
    plugins: [
      require('daisyui'),
    ],
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    //...
  }  