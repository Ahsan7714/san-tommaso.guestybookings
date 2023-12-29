import React, { useEffect } from 'react';
import "./Translator.css"

const GoogleTranslateButton = () => {
  useEffect(() => {
    // Function to initialize the Google Translate button
    function googleTranslateElementInit() {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,it,nl',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          defaultLanguage: 'en', // Set English as the default language
          gaTrack: true, // Enable tracking
          gaId: 'YOUR_GA_ID' // Replace 'YOUR_GA_ID' with your Google Analytics ID
        },
        'google_translate_element'
      );
    }

    // Check if the Google Translate script is not already loaded
    if (!window.google || !window.google.translate) {
      // Load the Google Translate script
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    } else {
      // If the script is already loaded, manually initialize the button
      googleTranslateElementInit();
    }
  }, []);

  return (
    <div id="google_translate_element" >
      <style>
      </style>
    </div>
  );
};

export default GoogleTranslateButton;
