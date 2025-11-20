import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import content files
import commonContent from './data/content/common.json';
import homeContent from './data/content/home.json';
import aboutContent from './data/content/about.json';
import trainingContent from './data/content/training.json';
import contactContent from './data/content/contact.json';
import pricingContent from './data/content/pricing.json';
import modalsContent from './data/content/modals.json';

// Helper function to transform content structure
const transformContent = (content: any, lang: string) => {
  const resources: any = {};

  const traverse = (obj: any, path: string[] = []) => {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        const currentPath = [...path, key];

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          if (Object.prototype.hasOwnProperty.call(value, 'en') && Object.prototype.hasOwnProperty.call(value, 'he')) {
            // It's a translation object
            const translation = value[lang];
            // Set the value at the correct path in resources
            let current = resources;
            for (let i = 0; i < currentPath.length - 1; i++) {
              if (!current[currentPath[i]]) current[currentPath[i]] = {};
              current = current[currentPath[i]];
            }
            current[currentPath[currentPath.length - 1]] = translation;
          } else {
            // It's a nested structure
            traverse(value, currentPath);
          }
        } else if (Array.isArray(value)) {
          // Handle arrays (like timeline, team members)
          let current = resources;
          for (let i = 0; i < currentPath.length - 1; i++) {
            if (!current[currentPath[i]]) current[currentPath[i]] = {};
            current = current[currentPath[i]];
          }

          // We need to map the array and transform items inside if they have translations
          current[currentPath[currentPath.length - 1]] = value.map((item: any) => {
            if (typeof item === 'string') return item; // Simple string array

            // For object arrays, we need to transform each object
            const transformedItem: any = {};
            const itemTraverse = (itemObj: any, targetObj: any) => {
              for (const itemKey in itemObj) {
                const itemValue = itemObj[itemKey];
                if (typeof itemValue === 'object' && itemValue !== null && !Array.isArray(itemValue)) {
                  if (Object.prototype.hasOwnProperty.call(itemValue, 'en') && Object.prototype.hasOwnProperty.call(itemValue, 'he')) {
                    targetObj[itemKey] = itemValue[lang];
                  } else {
                    targetObj[itemKey] = {};
                    itemTraverse(itemValue, targetObj[itemKey]);
                  }
                } else if (Array.isArray(itemValue)) {
                  // Handle nested arrays (like features in training options)
                  targetObj[itemKey] = itemValue.map((subItem: any) => {
                    if (typeof subItem === 'string') return subItem;
                    // Assuming simple string arrays for now inside objects, or simple translation objects
                    if (typeof subItem === 'object' && subItem.en && subItem.he) {
                      return subItem[lang];
                    }
                    return subItem;
                  });
                } else {
                  targetObj[itemKey] = itemValue;
                }
              }
            };

            if (typeof item === 'object') {
              itemTraverse(item, transformedItem);
              return transformedItem;
            }
            return item;
          });
        } else {
          // It's a string or number (non-translatable or shared)
          let current = resources;
          for (let i = 0; i < currentPath.length - 1; i++) {
            if (!current[currentPath[i]]) current[currentPath[i]] = {};
            current = current[currentPath[i]];
          }
          current[currentPath[currentPath.length - 1]] = value;
        }
      }
    }
  };

  traverse(content);
  return resources;
};

// Merge all content files
const fullContent = {
  common: commonContent,
  home: homeContent,
  about: aboutContent,
  training: trainingContent,
  contact: contactContent,
  pricing: pricingContent,
  modals: modalsContent
};

const resources = {
  en: {
    translation: transformContent(fullContent, 'en')
  },
  he: {
    translation: transformContent(fullContent, 'he')
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'he', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
