export type ShayariCategory =
  | 'truck'
  | 'funny'
  | 'romantic'
  | 'sad'
  | 'philosophical'
  | 'chai'
  | 'highway'
  | 'nostalgia'
  | 'late-night';

export interface ShayariItem {
  id: string;
  text: string;
  category: ShayariCategory;
  isTruckStyle?: boolean; // Hand-painted truck lettering style
  isWallStyle?: boolean;  // Faded dhaba wall writing style
  specialBadge?: string;  // e.g. "HORN OK PLEASE" or "🚛"
}

export const HIGHWAY_SHAYARI_LIST: ShayariItem[] = [
  { id: '1', text: 'बुरी नज़र वाले, तेरा मुँह काला।', category: 'truck', isTruckStyle: true, specialBadge: 'HORN OK PLEASE' },
  { id: '2', text: 'माँ का आशीर्वाद।', category: 'truck', isTruckStyle: true, specialBadge: '🚛' },
  { id: '3', text: 'हॉर्न प्लीज़, ओवरटेक विद लव।', category: 'truck', isTruckStyle: true, specialBadge: 'OVERTAKE WITH LOVE' },
  { id: '4', text: 'देख मगर प्यार से।', category: 'truck', isTruckStyle: true, specialBadge: 'HORN OK PLEASE' },
  { id: '5', text: 'धीरे चलोगे, दूर तक जाओगे।', category: 'highway', isTruckStyle: true },
  { id: '6', text: 'जलने वाले जलते रहेंगे, ट्रक वाले चलते रहेंगे।', category: 'truck', isTruckStyle: true },
  { id: '7', text: 'अपना टाइम आएगा, पर ट्रक धीरे जाएगा।', category: 'funny', isTruckStyle: true },
  { id: '8', text: 'मंज़िल से ज्यादा, सफ़र हसीन है।', category: 'philosophical', isWallStyle: true },
  { id: '9', text: 'तू साथ हो तो हर रास्ता घर लगता है।', category: 'romantic' },
  { id: '10', text: 'दिल तो बच्चा है जी, हाईवे लंबा है जी।', category: 'funny' },
  { id: '11', text: 'जिसे ढूँढते रहे, वो सफ़र में मिल गया।', category: 'nostalgia' },
  { id: '12', text: 'रास्ते बदल गए, यादें नहीं।', category: 'sad' },
  { id: '13', text: 'मोहब्बत भी हाईवे जैसी है, मोड़ बहुत आते हैं।', category: 'romantic' },
  { id: '14', text: 'तुम याद आए, रास्ता लंबा हो गया।', category: 'romantic' },
  { id: '15', text: 'कुछ सफ़र मंज़िल के लिए नहीं, खुद को ढूँढने के लिए होते हैं।', category: 'philosophical' },
  { id: '16', text: 'रास्ते ख़ामोश थे, यादें बहुत शोर करती रहीं।', category: 'late-night' },
  { id: '17', text: 'रात लंबी थी, सफ़र उससे भी लंबा।', category: 'late-night' },
  { id: '18', text: 'जिसे घर जाना था, वो रास्तों में रह गया।', category: 'sad' },
  { id: '19', text: 'कुछ लोग सफ़र में मिलते हैं, ज़िंदगी भर याद रहते हैं।', category: 'nostalgia' },
  { id: '20', text: 'चाय गरम है, दिल थोड़ा ठंडा कर लो।', category: 'chai', isWallStyle: true },
  { id: '21', text: 'सफ़र में थक जाओ तो रुक जाना, हार मत मानना।', category: 'philosophical' },
  { id: '22', text: 'हाईवे पर सब अपने हैं, बस मंज़िल अलग-अलग है।', category: 'highway' },
  { id: '23', text: 'एक कप चाय और थोड़ी सी तन्हाई।', category: 'chai', isWallStyle: true },
  { id: '24', text: 'रास्ता लंबा है साहब, गाना अच्छा होना चाहिए।', category: 'highway' },
  { id: '25', text: 'दिल उदास हो तो हाईवे अच्छा लगता है।', category: 'sad' },
  { id: '26', text: 'मंज़िल मिले ना मिले, सफ़र याद रहना चाहिए।', category: 'philosophical' },
  { id: '27', text: 'कुछ रातें सोने के लिए नहीं, याद करने के लिए होती हैं।', category: 'late-night' },
  { id: '28', text: 'जो पीछे छूट गया, वही सबसे ज्यादा याद आता है।', category: 'nostalgia' },
  { id: '29', text: 'सफ़र वही खूबसूरत है, जिसमें कोई जल्दी नहीं।', category: 'philosophical' },
  { id: '30', text: 'चलते रहो मुसाफ़िर, रास्ते खुद बनते जाएंगे।', category: 'highway' },
  { id: '31', text: 'आज फिर किसी मोड़ पर पुरानी याद मिल गई।', category: 'nostalgia' },
  { id: '32', text: 'रात, सड़क और एक पुराना गाना। बस इतना ही काफी है।', category: 'late-night' },
  { id: '33', text: 'कभी-कभी रास्ते ही जवाब दे देते हैं।', category: 'philosophical' },
  { id: '34', text: 'चाय छोटी हो या बड़ी, बात साथ बैठने की होती है।', category: 'chai', isWallStyle: true },
  { id: '35', text: 'दिल का रास्ता GPS से नहीं मिलता।', category: 'funny' },
  { id: '36', text: 'हॉर्न से रास्ता मिलता है, प्यार से मंज़िल।', category: 'truck', isTruckStyle: true },
  { id: '37', text: 'गाड़ी अपनी, रास्ते अपने, यादें किसी और की।', category: 'sad' },
  { id: '38', text: 'रुकना भी सफ़र का हिस्सा है।', category: 'philosophical' },
  { id: '39', text: 'थोड़ा धीरे चल मुसाफ़िर, यादें पीछे छूट रही हैं।', category: 'nostalgia' },
];
