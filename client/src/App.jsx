import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ username: '', redFlags: 5, comment: '' });

  // Yeni Render Backend URL'in
  const API_URL = 'https://redflag-tracker-1.onrender.com/api/UserReview';

  const fetchReviews = () => {
    axios.get(API_URL)
      .then((res) => {
        setReviews(res.data || []);
      })
      .catch((err) => {
        console.error("Veri çekme hatası:", err);
      });
  };
  
  useEffect(() => {
    fetchReviews();
  }, []);

  const sendReview = async (e) => {
    e.preventDefault();

    const yasakliKelimeler = ['küfür1', 'argo2', 'hakaret3']; 
    const kontrolMetni = (form.username + " " + form.comment).toLowerCase();
    const yasakliVarMi = yasakliKelimeler.some(k => kontrolMetni.includes(k));

    if (yasakliVarMi) {
      alert("⚠️ Uyarı: Raporunuz uygunsuz kelimeler içeriyor!");
      return;
    }

    if(!form.username.trim()) {
      alert("Kullanıcı adı gerekli!");
      return;
    }

    try {
      await axios.post(API_URL, form);
      setForm({ username: '', redFlags: 5, comment: '' });
      fetchReviews();
    } catch (err) {
      console.log("Bağlantı detayı:", err.message);
      alert("Gönderilemedi, sunucu uyanıyor olabilir. Lütfen 30 saniye sonra tekrar deneyin.");
    }
  };

  const gosterilecekListe = reviews
    .filter(r => r.username && r.username.toLowerCase().includes(search.toLowerCase()))
    .slice()
    .reverse();

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'radial-gradient(circle at top right, #2d0b2e, #050505)', 
      color: '#fff', padding: '20px', fontFamily: 'sans-serif' 
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '3rem', fontWeight: '900',
            background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0
          }}>RED FLAG</h1>
          <p style={{ color: '#888' }}>Güvenli Topluluk Ağı</p>
        </header>

        <div style={{ 
          background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', 
          padding: '25px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '30px'
        }}>
          <form onSubmit={sendReview} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              placeholder="@instagram_id" 
              value={form.username} 
              onChange={e => setForm({...form, username: e.target.value})} 
              style={{ padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#111', color: '#fff' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label>Red Flag: <b>{form.redFlags}</b></label>
              <input type="range" min="1" max="10" value={form.redFlags} 
                onChange={e => setForm({...form, redFlags: parseInt(e.target.value)})} 
                style={{ width: '60%' }} />
            </div>
            <textarea 
              placeholder="Deneyimini anlat..." 
              value={form.comment} 
              onChange={e => setForm({...form, comment: e.target.value})} 
              style={{ padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#111', color: '#fff', minHeight: '80px' }}
            />
            <button type="submit" style={{ 
              background: '#fff', color: '#000', border: 'none', padding: '15px', 
              borderRadius: '12px', cursor: 'pointer', fontWeight: '800'
            }}>RAPORLA</button>
          </form>
        </div>

        <input 
          placeholder="🔍 Veritabanında ara..." 
          style={{ 
            width: '100%', padding: '15px', borderRadius: '15px', border: '1px solid #333', 
            backgroundColor: 'transparent', color: '#fff', marginBottom: '30px', boxSizing: 'border-box' 
          }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={{ display: 'grid', gap: '15px' }}>
          {gosterilecekListe.map((r, index) => (
            <div key={index} style={{ 
              background: 'rgba(255, 255, 255, 0.02)', padding: '20px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '700', color: '#ff416c' }}>{r.username}</span>
                <span style={{ background: '#ff416c', padding: '2px 8px', borderRadius: '5px', fontSize: '0.7rem' }}>🚩 {r.redFlags}</span>
              </div>
              <p style={{ color: '#ccc', marginTop: '10px' }}>{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;