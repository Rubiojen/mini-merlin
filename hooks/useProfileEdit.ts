import * as Haptics from "expo-haptics";
import {useCallback, useMemo, useState} from "react";

import {mockProfile} from "@/data/profile";
import {useAppState, useIgSiteById} from "@/state/appState";

type UseProfileEdit = {
  title: string;
  about: string;
  setTitle: (v: string) => void;
  setAbout: (v: string) => void;
  editingTitle: boolean;
  editingAbout: boolean;
  startEditTitle: () => void;
  endEditTitle: () => void;
  startEditAbout: () => void;
  endEditAbout: () => void;
  resetToDefaults: () => void;
};

export function useProfileEdit(username: string): UseProfileEdit {
  const site = useIgSiteById(username);
  const updateIgSite = useAppState((s) => s.updateIgSite);

  const [editingTitle, setEditingTitle] = useState(false);
  const [editingAbout, setEditingAbout] = useState(false);

  const title = useMemo(
    () => site?.profileData.displayName ?? "",
    [site?.profileData.displayName]
  );

  const about = useMemo(
    () => site?.profileData.bio_ai ?? "",
    [site?.profileData.bio_ai]
  );

  const setTitle = useCallback(
    (v: string) => {
      const next = v.slice(0, 40);
      updateIgSite(username, {profileData: {displayName: next}} as any);
    },
    [username, updateIgSite]
  );

  const setAbout = useCallback(
    (v: string) => {
      const next = v.slice(0, 200);
      updateIgSite(username, {profileData: {bio_ai: next}} as any);
    },
    [username, updateIgSite]
  );

  const startEditTitle = useCallback(() => {
    Haptics.selectionAsync();
    setEditingTitle(true);
  }, []);
  const endEditTitle = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setEditingTitle(false);
  }, []);
  const startEditAbout = useCallback(() => {
    Haptics.selectionAsync();
    setEditingAbout(true);
  }, []);
  const endEditAbout = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setEditingAbout(false);
  }, []);

  const resetToDefaults = useCallback(() => {
    updateIgSite(username, {profileData: {...mockProfile}} as any);
  }, [username, updateIgSite]);

  return {
    title,
    about,
    setTitle,
    setAbout,
    editingTitle,
    editingAbout,
    startEditTitle,
    endEditTitle,
    startEditAbout,
    endEditAbout,
    resetToDefaults,
  };
}
