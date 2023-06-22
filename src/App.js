import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './components/Card';
import Square from './components/Square';
import NotePreview from './components/NotePreview';
import NoteForm from './components/NoteForm';
import Navbar from './components/Navbar';
import CalendarComponent from './components/CalendarComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './components/Calendario.css';


function App() {
  const [squares, setSquares] = useState([]);
  const [redCount, setRedCount] = useState(0);
  const [greenCount, setGreenCount] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [totalHours, setTotalHours] = useState(0);
  const [notes, setNotes] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);

  const handleDaySelect = (date) => {
    setSelectedDay(date);
    setIsCalendarExpanded(true);
  };

  const handleResetTable = () => {
    setSquares([]);
    setRedCount(0);
    setGreenCount(0);
    setSelectedColor('');
    setTotalHours(0);
    setNotes([]);
  };

  const handleGoToPreviousDay = () => {
    setSelectedDay((prevDay) => {
      const prevDayCopy = new Date(prevDay);
      prevDayCopy.setDate(prevDayCopy.getDate() - 1);
      return prevDayCopy;
    });
  };

  const handleGoToNextDay = () => {
    setSelectedDay((prevDay) => {
      const prevDayCopy = new Date(prevDay);
      prevDayCopy.setDate(prevDayCopy.getDate() + 1);
      return prevDayCopy;
    });
  };

  const handleClick = (index) => {
    if (totalHours === 24) {
      return;
    }

    const updatedSquares = [...squares];
    if (updatedSquares[index]) {
      if (updatedSquares[index].color !== selectedColor) {
        if (updatedSquares[index].color === 'red') {
          setRedCount((prevCount) => prevCount - 1);
        } else if (updatedSquares[index].color === 'green') {
          setGreenCount((prevCount) => prevCount - 1);
        }
      }
      updatedSquares[index] = { color: selectedColor, note: updatedSquares[index].note };
    } else {
      updatedSquares[index] = { color: selectedColor, note: '' };
      setTotalHours((prevHours) => prevHours + 1);
    }

    setSquares(updatedSquares);

    const updatedRedCount = updatedSquares.filter((square) => square && square.color === 'red').length;
    const updatedGreenCount = updatedSquares.filter((square) => square && square.color === 'green').length;
    setRedCount(updatedRedCount);
    setGreenCount(updatedGreenCount);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleNoteChange = (index, note) => {
    const updatedSquares = [...squares];
    updatedSquares[index].note = note;
    setSquares(updatedSquares);
  };

  const renderSquares = () => {
    const squareColors = ['#2a2a2a', '#2a2a2a'];
  
    const renderedSquares = [];
  
    for (let i = 0; i < 24; i++) {
      const squareStyle = {
        backgroundColor: squareColors[i % squareColors.length],
        color: '#fff',
      };
  
      if (squares[i]) {
        squareStyle.backgroundColor = squares[i].color;
        squareStyle.color = '#fff';
      }
  
      renderedSquares.push(
        <Square
          key={i}
          squareStyle={squareStyle}
          onClick={() => handleClick(i)}
          time={formatTime(i)}
          note={squares[i] ? squares[i].note : ''}
          onNoteChange={(note) => handleNoteChange(i, note)}
        />
      );
    }
  
    return renderedSquares;
  };
  
  const formatTime = (hour) => {
    if (hour < 10) {
      return `0${hour}:00`;
    }
    return `${hour}:00`;
  };
  
  const handleNoteSubmit = (note) => {
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
  };
  
  return (
    <div>
      <Navbar />
      <h1 className='Titul'>CRONOGRAM</h1>
      {!selectedDay && (
        <div>
          <h2 className='Selector'>Seleccionar una fecha </h2>
          <CalendarComponent onSelectDay={handleDaySelect} />
        </div>
      )}
      {selectedDay && (
        <div>
          <Card title={`Cronograma del día ${selectedDay.toLocaleDateString()}`} onTitleClick={() => setIsCalendarExpanded(true)}>
            {isCalendarExpanded ? (
              <>
                <div className="arrow left-arrow">
                  <FontAwesomeIcon icon={faArrowLeft} onClick={handleGoToPreviousDay} />
                </div>
                <div className="arrow right-arrow">
                  <FontAwesomeIcon icon={faArrowRight} onClick={handleGoToNextDay} />
                </div>
                <div className="menu">
                  <button className="marginbtn btn btn-danger" onClick={() => handleColorSelect('red')}>
                    Rojo
                  </button>
                  <button className="marginbtn btn btn-success" onClick={() => handleColorSelect('green')}>
                    Verde
                  </button>
                  {/* Agregar mas botones para seleccionar colores adicionales */}
                </div>
                <div className="container">{renderSquares()}</div>
                <div className="score">
                  <p className="text-danger">Tienes {redCount} horas marcadas de color rojo.</p>
                  <p className="text-success">Tienes {greenCount} horas marcadas de color verde.</p>
                  <button className="btn btn-secondary" onClick={handleResetTable}>
                    Reiniciar Tabla
                  </button>
                </div>
                <div className="notes">
                  {notes.map((note, index) => (
                    <NotePreview key={index} note={note} />
                  ))}
                </div>
              </>
            ) : (
              <CalendarComponent onSelectDay={handleDaySelect} selectedDay={selectedDay} />
            )}
          </Card>
        </div>
      )}
    </div>
  );
}

export default App;
