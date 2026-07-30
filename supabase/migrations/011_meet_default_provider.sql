-- Google Meet is the default classroom provider again.
-- Existing LiveKit rows keep provider = 'livekit'.

alter table public.live_classes
    alter column provider set default 'meet';
