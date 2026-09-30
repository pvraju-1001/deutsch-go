import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LevelProvider } from './context/LevelContext';
import { SpeechProvider } from './context/SpeechContext';
import { CalendarPage, DayPage, HomePage, NotFoundPage } from './pages';

export function App() {
  return (
    <LevelProvider>
      <SpeechProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="day/:date" element={<DayPage />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SpeechProvider>
    </LevelProvider>
  );
}
