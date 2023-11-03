import React, { useState } from 'react';
import { chronoData } from './chronoData';
import './App.css';

function App() {
  const [selectedInstantEffect, setSelectedInstantEffect] = useState('');
  const [selectedTurnEffect, setSelectedTurnEffect] = useState('');
  const [selectedLinkageEffect, setSelectedLinkageEffect] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const uniqueInstantEffects = [...new Set(chronoData.map(item => item.instantEffect))];
  const uniqueTurnEffects = [...new Set(chronoData.flatMap(item => item.turnEffect))];
  const uniqueLinkageEffects = [...new Set(chronoData.flatMap(item => item.linkageEffect.split('\n').map(effect => effect.trim())))];

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
      const matchesInstantEffect = !selectedInstantEffect || item.instantEffect.includes(selectedInstantEffect);
      const matchesTurnEffect = !selectedTurnEffect || item.turnEffect.includes(selectedTurnEffect);
      const matchesLinkageEffect = !selectedLinkageEffect || item.linkageEffect.includes(selectedLinkageEffect);
      const matchesSearchKeyword = !searchKeyword ||
        item.Name.includes(searchKeyword) ||
        item.instantEffect.includes(searchKeyword) ||
        item.turnEffect.includes(searchKeyword) ||
        item.linkageEffect.includes(searchKeyword);

      return matchesInstantEffect && matchesTurnEffect && matchesLinkageEffect && matchesSearchKeyword;
    });
  };

  const filteredData = filterData();

  return (
    <div className="App">
      <h1>時光牌搜尋器</h1>

      <div className="filters">
        <div className="filter">
          <h3>即時效果</h3>
          {uniqueInstantEffects.map((effect, index) => (
            <label key={index}>
              <input
                type="radio"
                name="instantEffect"
                value={effect}
                checked={selectedInstantEffect === effect}
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
                checked={selectedTurnEffect === effect}
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
                checked={selectedLinkageEffect === effect}
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
