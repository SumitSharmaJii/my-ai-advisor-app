import { Product, PRODUCT_CATALOG } from '../types/productCatalog';

export interface AIRecommendation {
  product: Product;
  reason: string;
  matchScore: number;
}

export class AIService {
  private static readonly GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  
  // Google Gemini API key
  // WE ARE USING THE FREE TIER OF GOOGLE GEMINI API 
  // Later : Keep the API KEY IN .env file
  private static readonly API_KEY = 'DDDDDDDDD AIzaSDDDDDDDDDyAWfBxl2QhTIUz6sb34bpoPDDDDDDDDDqPrNlmUWa9E DDDDDDDDD';

  static async getRecommendations(userQuery: string): Promise<AIRecommendation[]> {
    try {      
      return await this.getGeminiRecommendations(userQuery);
    } catch (error) {
      console.error('Error getting AI recommendations:', error);
      throw new Error('Failed to get recommendations');
    }
  }

  private static async getGeminiRecommendations(userQuery: string): Promise<AIRecommendation[]> {
    const prompt = this.buildPrompt(userQuery);
    
    const response = await fetch(this.GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': this.API_KEY,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates[0].content.parts[0].text;
    
    return this.parseAIResponse(aiResponse);
  }

  private static buildPrompt(userQuery: string): string {
    const catalogString = PRODUCT_CATALOG.map((product: Product, index: number) => 
      `${index + 1}. ${product.product_name} by ${product.brand}
       Category: ${product.category}
       Price: ₹${product.price}
       Description: ${product.description}`
    ).join('\n\n');

    return `You are an AI product recommendation assistant. Based on the user's query and the product catalog below, recommend the top 5 most relevant products.

User Query: "${userQuery}"

Product Catalog:
${catalogString}

Please analyze the user's needs and recommend the most suitable products. For each recommendation, provide:
1. The product name and brand
2. A clear explanation of why this product matches their needs
3. A match score from 1-100

Format your response as JSON with this structure:
{
  "recommendations": [
    {
      "productIndex": 1,
      "reason": "Detailed explanation of why this product matches",
      "matchScore": 85
    }
  ]
}

Focus on:
- Category relevance
- Price appropriateness
- Feature alignment
- User's specific requirements mentioned in the query

Return only the JSON response, no additional text.`;
  }

  private static parseAIResponse(aiResponse: string): AIRecommendation[] {
    try {
      // Remove markdown code block formatting if present
      let cleanResponse = aiResponse.trim();
      if (cleanResponse.startsWith('```json')) {
        cleanResponse = cleanResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanResponse.startsWith('```')) {
        cleanResponse = cleanResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      const parsed = JSON.parse(cleanResponse);
      const recommendations: AIRecommendation[] = [];

      for (const rec of parsed.recommendations) {
        const product = PRODUCT_CATALOG[rec.productIndex - 1];
        if (product) {
          recommendations.push({
            product,
            reason: rec.reason,
            matchScore: rec.matchScore,
          });
        }
      }

      return recommendations;
    } catch (error) {
      console.error('Error parsing AI response:', error);
      throw new Error('Failed to parse AI recommendations');
    }
  }


}
