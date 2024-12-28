const TOGGCalculator = () => {
  const [inputs, setInputs] = React.useState({
    capacity: 88.5,
    start: 10,
    addedEnergy: '',
    chargingPower: 180
  });

  const [results, setResults] = React.useState({
    newPercentage: null,
    timeToCharge: null,
    error: null
  });

  const calculate = () => {
    try {
      const { capacity, start, addedEnergy, chargingPower } = inputs;
      
      if (start < 0 || start > 100) {
        throw new Error('Başlangıç yüzdesi 0-100 arasında olmalıdır');
      }
      if (addedEnergy < 0) {
        throw new Error('Eklenen enerji negatif olamaz');
      }
      
      const addedPercentage = (addedEnergy / capacity) * 100;
      const newPercentage = start + addedPercentage;
      
      if (newPercentage > 100) {
        throw new Error('Toplam şarj %100\'ü geçemez');
      }

      const timeToCharge = addedEnergy / chargingPower;

      setResults({
        newPercentage,
        timeToCharge,
        error: null
      });
    } catch (error) {
      setResults({
        ...results,
        error: error.message
      });
    }
  };

  const formatTime = (hours) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h} saat ${m} dakika`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">TOGG Şarj Hesaplama</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Batarya Kapasitesi (kWh)</label>
            <input
              type="number"
              value={inputs.capacity}
              onChange={(e) => setInputs({ ...inputs, capacity: parseFloat(e.target.value) || 0 })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Başlangıç Yüzdesi (%)</label>
            <input
              type="number"
              value={inputs.start}
              onChange={(e) => setInputs({ ...inputs, start: parseFloat(e.target.value) || 0 })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Eklenen Enerji (kWh)</label>
            <input
              type="number"
              value={inputs.addedEnergy}
              onChange={(e) => setInputs({ ...inputs, addedEnergy: parseFloat(e.target.value) || 0 })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Şarj Gücü (kW)</label>
            <input
              type="number"
              value={inputs.chargingPower}
              onChange={(e) => setInputs({ ...inputs, chargingPower: parseFloat(e.target.value) || 0 })}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            onClick={calculate}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Hesapla
          </button>

          {results.error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {results.error}
            </div>
          ) : results.newPercentage !== null && (
            <div className="space-y-2">
              <div className="bg-green-100 p-4 rounded">
                <div className="font-medium">Yeni Şarj Durumu:</div>
                <div className="text-2xl">{results.newPercentage.toFixed(1)}%</div>
              </div>
              {results.timeToCharge && (
                <div className="bg-blue-100 p-4 rounded">
                  <div className="font-medium">Tahmini Şarj Süresi:</div>
                  <div className="text-2xl">{formatTime(results.timeToCharge)}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Render the app
ReactDOM.render(<TOGGCalculator />, document.getElementById('root'));
