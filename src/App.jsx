import { useState } from 'react'
import { supabase } from './supabaseClient' // On importe la connexion

function App() {
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedPeriodes, setSelectedPeriodes] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [pseudo, setPseudo] = useState('');
  const [loading, setLoading] = useState(false); // État pour le chargement

  const themes = ["Cinéma", "Série", "Musique", "Dessin Animé", "Animé", "Jeux Vidéo", "Télévision"];
  const periodes = ["60-70", "80-90", "2000-2010", "2020+"];
  const genres = ["Variété française", "Variété internationale", "Rock/Hardrock", "Pop", "Métal"];

  const opacityValue = 0.765;
  const colorVioletClair = `rgba(167, 139, 250, ${opacityValue})`; 
  const colorMauveSelection = `rgba(107, 33, 168, ${opacityValue})`; 
  const colorBoutonValider = `rgba(147, 51, 234, ${opacityValue})`; 

  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  // FONCTION D'ENREGISTREMENT
  const handleSave = async () => {
    if (!pseudo.trim()) {
      alert("⚠️ S'il te plaît, entre un pseudo avant de valider !");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from('profiles') // Ta table doit s'appeler 'profiles'
      .insert([
        { 
          username: pseudo, 
          themes: selectedThemes, 
          periodes: selectedPeriodes, 
          genres: selectedGenres 
        }
      ]);

    if (error) {
      console.error("Erreur Supabase:", error.message);
      alert("❌ Erreur lors de l'enregistrement...");
    } else {
      alert("✅ Profil enregistré ! Prépare-toi pour le Blindtest.");
    }

    setLoading(false);
  };

  const styleCardBase = {
    backdropFilter: 'blur(20px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '2rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    color: 'white',
    boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
  };

  return (
    <div 
      className="h-screen w-full bg-cover bg-center bg-fixed font-sans"
      style={{ 
        // Modification ici pour que l'image de fond fonctionne sur GitHub Pages
        backgroundImage: `url(${import.meta.env.BASE_URL}background.jpg)`,
        margin: 0,
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
    >
      <div className="fixed inset-0 bg-black/40 -z-10"></div>

      <div style={{ textAlign: 'center', marginBottom: '3rem', flexShrink: 0 }}>
        <h1 style={{ 
          fontSize: 'clamp(2rem, 8vw, 3.5rem)', 
          fontWeight: '900', 
          fontStyle: 'italic', 
          margin: 0,
          color: '#d8b4fe', 
          WebkitTextStroke: '2px #581c87', 
          textShadow: '0 0 20px rgba(168, 85, 247, 0.5)',
          textTransform: 'uppercase'
        }}>
          BLINDTEST DU LIVE <span style={{ color: '#d8b4fe' }}>24H DE NICOU</span>
        </h1>
        <div style={{ height: '4px', width: '150px', backgroundColor: '#a855f7', margin: '15px auto', borderRadius: '2px' }}></div>
      </div>

      <div style={{ ...styleCardBase, maxWidth: '450px', marginBottom: '2rem' }}>
        <label style={{ display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', opacity: 0.8 }}>
          Ton pseudo
        </label>
        <input 
          type="text" 
          placeholder="Ton pseudo..."
          value={pseudo}
          style={{ 
            backgroundColor: colorVioletClair, 
            color: 'white', 
            width: '100%', 
            padding: '12px', 
            borderRadius: '8px', 
            border: '1px solid rgba(255,255,255,0.3)', 
            textAlign: 'center',
            fontSize: '1.2rem',
            outline: 'none'
          }}
          onChange={(e) => setPseudo(e.target.value)}
        />
      </div>

      <div style={{ ...styleCardBase, maxWidth: '750px', marginBottom: '40px' }}>
        <h2 style={{ textAlign: 'center', fontStyle: 'italic', marginBottom: '2rem', textTransform: 'uppercase', fontSize: '1.5rem', fontWeight: '800' }}>Catégories</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '2rem' }}>
          {themes.map(theme => {
            const isSelected = selectedThemes.includes(theme);
            return (
              <button
                key={theme}
                onClick={() => toggleSelection(theme, selectedThemes, setSelectedThemes)}
                style={{ 
                  backgroundColor: isSelected ? colorMauveSelection : colorVioletClair,
                  color: 'white',
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {theme}
              </button>
            );
          })}
        </div>

        {selectedThemes.includes("Musique") && (
          <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: '25px', borderRadius: '12px', border: '1px solid rgba(168, 85, 247, 0.4)', marginBottom: '2rem' }}>
            <h3 style={{ textAlign: 'center', color: '#d8b4fe', textTransform: 'uppercase', margin: '0 0 20px 0', fontSize: '1.1rem' }}>Configuration Musique</h3>
            
            <div style={{ marginBottom: '25px' }}>
              <p style={{ fontSize: '0.75rem', textAlign: 'center', opacity: 0.7, textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '10px' }}>Périodes</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
                {periodes.map(p => (
                  <button
                    key={p}
                    onClick={() => toggleSelection(p, selectedPeriodes, setSelectedPeriodes)}
                    style={{ backgroundColor: selectedPeriodes.includes(p) ? colorMauveSelection : colorVioletClair, color: 'white', padding: '10px 18px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: '0.75rem', textAlign: 'center', opacity: 0.7, textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '10px' }}>Genres</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
                {genres.map(g => (
                  <button
                    key={g}
                    onClick={() => toggleSelection(g, selectedGenres, setSelectedGenres)}
                    style={{ backgroundColor: selectedGenres.includes(g) ? colorMauveSelection : colorVioletClair, color: 'white', padding: '10px 18px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={handleSave}
          disabled={loading} // Désactivé pendant l'envoi
          style={{ 
            backgroundColor: colorBoutonValider, 
            color: 'white', 
            width: '100%', 
            padding: '20px', 
            borderRadius: '8px', 
            border: '1px solid rgba(255,255,255,0.3)', 
            fontWeight: '900', 
            textTransform: 'uppercase', 
            letterSpacing: '3px',
            fontSize: '1.2rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
          onMouseOver={(e) => !loading && (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseOut={(e) => !loading && (e.currentTarget.style.transform = 'scale(1)')}
        >
          {loading ? "Enregistrement..." : "Valider le profil"}
        </button>
      </div>
    </div>
  )
}

export default App