import React, { useState } from 'react';
import { chronoData } from './chronoData';
import './App.css';

function App() {
  const [selectedInstantEffect, setSelectedInstantEffect] = useState('');
  const [selectedTurnEffect, setSelectedTurnEffect] = useState('');
  const [selectedLinkageEffect, setSelectedLinkageEffect] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const uniqueInstantEffects = ['不限', ...new Set(chronoData.map(item => {
    const trimmedInstantEffect = item.instantEffect;
    const keywords = ['CD', 'Combo', '亢奮'];
    for (const keyword of keywords) {
      if (trimmedInstantEffect.includes(keyword)) {
        return keyword;
      }
    }
    return trimmedInstantEffect;
  }))];

  const uniqueTurnEffects = ['不限', ...new Set(chronoData.flatMap(item =>
    item.turnEffect.map(effect => 
      (effect.includes('追打') ? '追打' : 
      effect.includes('攻擊力提升') ? '攻擊力提升' :
      effect.includes('回復力提升') ? '回復力提升' :
      effect.includes('燃燒') ? '燃燒' :
      effect.includes('黏腐') ? '黏腐' :
      effect.includes('五屬盾') ? '五屬盾' :
      effect.includes('十字限盾') ? '十字限盾' :
      effect.includes('轉化為') ? '直行轉化' :
      effect)
    )
  ))];

  const uniqueLinkageEffects = ['不限', ...new Set(chronoData.flatMap(item => {
    const trimmedInstantEffect = item.linkageEffect.split('\n').map(effect => effect.trim());
    console.log(trimmedInstantEffect);
    const keywords = ['固定連擊盾', '五屬盾', '指定形狀盾', '攻擊力提升', 'CD'];
    for (const keyword of keywords) {
      if (trimmedInstantEffect[0].includes(keyword)) {
        return keyword;
      }
    }
    return trimmedInstantEffect;
  }))];

  const toggleSelectedInstantEffect = (effect) => {
    if (selectedInstantEffect === effect) {
      setSelectedInstantEffect('');
    } else {
      setSelectedInstantEffect(effect);
    }
  };

  const toggleSelectedTurnEffect = (effect) => {
    if (selectedTurnEffect === effect) {
      setSelectedTurnEffect('');
    } else {
      setSelectedTurnEffect(effect);
    }
  };

  const toggleSelectedLinkageEffect = (effect) => {
    if (selectedLinkageEffect === effect) {
      setSelectedLinkageEffect('');
    } else {
      setSelectedLinkageEffect(effect);
    }
  };

  const filterData = () => {
    return chronoData.filter(item => {
      const matchesInstantEffect = selectedInstantEffect === '不限' || !selectedInstantEffect || item.instantEffect.includes(selectedInstantEffect);
      const matchesTurnEffect = selectedTurnEffect === '不限' || !selectedTurnEffect || item.turnEffect.some(element => element.includes(selectedTurnEffect));
      const matchesLinkageEffect = selectedLinkageEffect === '不限' || !selectedLinkageEffect || item.linkageEffect.includes(selectedLinkageEffect);
      const matchesSearchKeyword = !searchKeyword ||
        item.Name.includes(searchKeyword) ||
        item.instantEffect.includes(searchKeyword) ||
        item.turnEffect.some(element => element.includes(searchKeyword)) ||
        item.linkageEffect.includes(searchKeyword);

      return matchesInstantEffect && matchesTurnEffect && matchesLinkageEffect && matchesSearchKeyword;
    });
  };

  const filteredData = filterData();

  return (
    <div className="App">
      <h1>流光系統搜尋器</h1>

      <div className="filters">
        <div className="filter">
          <h3>即時效果</h3>
          {uniqueInstantEffects.map((effect, index) => (
            <label key={index}>
              <input
                type="radio"
                name="instantEffect"
                value={effect}
                checked={selectedInstantEffect === effect || (effect === '不限' && !selectedInstantEffect)}
                onChange={() => toggleSelectedInstantEffect(effect)}
              />
              {effect}
            </label>
          ))}
        </div>

        <div className="filter">
          <h3>回合效果</h3>
          {uniqueTurnEffects.map((effect, index) => (
            <label key={index}>
              <input
                type="radio"
                name="turnEffect"
                value={effect}
                checked={selectedTurnEffect === effect || (effect === '不限' && !selectedTurnEffect)}
                onChange={() => toggleSelectedTurnEffect(effect)}
              />
              {effect}
            </label>
          ))}
        </div>

        <div className="filter">
          <h3>連動效果</h3>
          {uniqueLinkageEffects.map((effect, index) => (
            <label key={index}>
              <input
                type="radio"
                name="linkageEffect"
                value={effect}
                checked={selectedLinkageEffect === effect || (effect === '不限' && !selectedLinkageEffect)}
                onChange={() => toggleSelectedLinkageEffect(effect)}
              />
              {effect}
            </label>
          ))}
        </div>

        <div className="filter">
          <h3>Keyword Search</h3>
          <input
            type="text"
            placeholder="關鍵字搜尋"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
      </div>

      <div className="results">
        {filteredData.map((item, index) => (
          <div key={index} className="result-item">
            <h3>{item.Name}</h3>
            <p>即時效果：{item.instantEffect}</p>
            <p>回合效果：</p>
            <ul className="turn-effect-list">
              {item.turnEffect.map((effect, index) => (
                <li key={index}>{effect}</li>
              ))}
            </ul>
            <p>連動效果：{item.linkageEffect}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
