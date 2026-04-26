import { useState, useEffect, useRef, useCallback } from 'react';
import {
  resolveGrid,
  generateQueue,
  generateTileValue,
  isGameOver,
} from '../utils/gameLogic';

const BEST_KEY = 'justdivide_best';

function loadBest() {
  return parseInt(localStorage.getItem(BEST_KEY) || '0', 10);
}

function saveBest(score) {
  localStorage.setItem(BEST_KEY, String(score));
}

function makeInitialState(difficulty = 1) {
  return {
    grid: Array(16).fill(null),
    queue: generateQueue(1, difficulty),
    keepVal: null,
    score: 0,
    bestScore: loadBest(),
    undoStack: [],
    level: 1,
    trashCount: 10,
    hintsEnabled: false,
    timer: 0,
    gameOver: false,
    difficulty,
  };
}

export function useGameState() {
  const [state, setState] = useState(() => makeInitialState(1));
  const timerRef = useRef(null);
  const dragValRef = useRef(null);
  const touchRef = useRef(null);
  const ghostRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setState((s) => (s.gameOver ? s : { ...s, timer: s.timer + 1 }));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const restart = useCallback(() => {
    setState((s) => makeInitialState(s.difficulty));
  }, []);

  const undo = useCallback(() => {
    setState((s) => {
      if (!s.undoStack.length || s.gameOver) return s;
      const prev = s.undoStack[s.undoStack.length - 1];
      return { ...s, ...prev, undoStack: s.undoStack.slice(0, -1), gameOver: false };
    });
  }, []);

  const toggleHints = useCallback(() => {
    setState((s) => ({ ...s, hintsEnabled: !s.hintsEnabled }));
  }, []);

  const setDifficulty = useCallback((d) => {
    setState((s) => ({ ...s, difficulty: d }));
  }, []);

  const placeTile = useCallback((idx, val) => {
    setState((s) => {
      if (s.gameOver || s.grid[idx] !== null) return s;
      const snapshot = {
        grid: s.grid,
        queue: s.queue,
        keepVal: s.keepVal,
        score: s.score,
        level: s.level,
        trashCount: s.trashCount,
      };
      const { grid: newGrid, scoreGained } = resolveGrid(s.grid, idx, val);
      const newQueue = [
        ...s.queue.slice(1),
        generateTileValue(s.level, s.difficulty),
      ];
      const newScore = s.score + scoreGained;
      const newLevel = Math.floor(newScore / 10) + 1;
      const leveledUp = newLevel > s.level;
      const newTrash = leveledUp ? s.trashCount + 5 : s.trashCount;
      const newBest = Math.max(newScore, s.bestScore);
      if (newBest > s.bestScore) saveBest(newBest);
      const over = isGameOver(newGrid, newQueue);
      return {
        ...s,
        grid: newGrid,
        queue: newQueue,
        score: newScore,
        bestScore: newBest,
        level: newLevel,
        trashCount: newTrash,
        undoStack: [...s.undoStack.slice(-9), snapshot],
        gameOver: over,
      };
    });
  }, []);

  const keep = useCallback(() => {
    setState((s) => {
      if (s.gameOver) return s;
      const activeVal = s.queue[0];
      if (s.keepVal === null) {
        return {
          ...s,
          keepVal: activeVal,
          queue: [...s.queue.slice(1), generateTileValue(s.level, s.difficulty)],
        };
      }
      return {
        ...s,
        keepVal: activeVal,
        queue: [s.keepVal, ...s.queue.slice(1)],
      };
    });
  }, []);

  const trash = useCallback(() => {
    setState((s) => {
      if (s.gameOver || s.trashCount <= 0) return s;
      return {
        ...s,
        queue: [...s.queue.slice(1), generateTileValue(s.level, s.difficulty)],
        trashCount: s.trashCount - 1,
      };
    });
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'z' || e.key === 'Z') undo();
      if (e.key === 'r' || e.key === 'R') restart();
      if (e.key === 'g' || e.key === 'G') toggleHints();
      if (e.key === '1') setDifficulty(1);
      if (e.key === '2') setDifficulty(2);
      if (e.key === '3') setDifficulty(3);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, restart, toggleHints, setDifficulty]);

  const handleDragStart = useCallback((e, val) => {
    dragValRef.current = val;
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((e, idx) => {
    e.preventDefault();
    if (dragValRef.current !== null) {
      placeTile(idx, dragValRef.current);
      dragValRef.current = null;
    }
  }, [placeTile]);

  const handleTouchStart = useCallback((e, val) => {
    touchRef.current = { val };
    e.preventDefault();
  }, []);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    if (!touchRef.current) return;
    const touch = e.touches[0];
    if (!ghostRef.current) {
      const g = document.createElement('div');
      g.style.cssText =
        'position:fixed;z-index:9999;pointer-events:none;opacity:0.75;' +
        'width:60px;height:60px;background:#f59e0b;border-radius:12px;' +
        'display:flex;align-items:center;justify-content:center;' +
        'font-size:20px;font-weight:900;color:#7a3000;' +
        'box-shadow:0 4px 12px rgba(0,0,0,0.3);';
      g.textContent = touchRef.current.val;
      document.body.appendChild(g);
      ghostRef.current = g;
    }
    ghostRef.current.style.left = touch.clientX - 30 + 'px';
    ghostRef.current.style.top = touch.clientY - 30 + 'px';
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (!touchRef.current) return;
    if (ghostRef.current) {
      document.body.removeChild(ghostRef.current);
      ghostRef.current = null;
    }
    const touch = e.changedTouches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    if (el) {
      const cellEl = el.closest('[data-cell-idx]');
      if (cellEl) placeTile(parseInt(cellEl.getAttribute('data-cell-idx')), touchRef.current.val);
      if (el.closest('[data-action="keep"]')) keep();
      if (el.closest('[data-action="trash"]')) trash();
    }
    touchRef.current = null;
    e.preventDefault();
  }, [placeTile, keep, trash]);

  return {
    state,
    actions: { placeTile, keep, trash, undo, restart, toggleHints, setDifficulty },
    dragHandlers: { handleDragStart, handleDragOver, handleDrop },
    touchHandlers: { handleTouchStart, handleTouchMove, handleTouchEnd },
  };
}
