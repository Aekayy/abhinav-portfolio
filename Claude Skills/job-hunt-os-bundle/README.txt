# Job Hunt OS — Claude Skills Bundle

From the AI Action Letter by Abhijay Arora (aiactionletter.substack.com)

One command turns your resume into a table of fresh jobs (posted in the last 24 hours), honest match scores, 2-3 resume changes per job, a named recruiter or hiring manager, and a ready-to-send LinkedIn message.

## What's in this bundle

- job-hunt-os.skill        -> the master pipeline (the one command)
- rocketship-radar.skill   -> finds aggressively-hiring companies + fresh jobs, ranks by resume match
- resume-tuner.skill       -> 2-3 concrete, honest resume changes per job
- warm-path-outreach.skill -> finds the recruiter/hiring manager + writes a 150-200 char message

Install ALL FOUR. The pipeline orchestrates the other three.

## Install on claude.ai (web) or Claude Desktop

1. Open a new chat on claude.ai
2. Attach the four .skill files to a message (drag and drop works)
3. Click "Save skill" on each file card
4. Verify under Settings -> Capabilities -> Skills

## Install for Claude Code

Unzip each .skill file (they are zip archives) into your skills folder:

  ~/.claude/skills/job-hunt-os/
  ~/.claude/skills/rocketship-radar/
  ~/.claude/skills/resume-tuner/
  ~/.claude/skills/warm-path-outreach/

Each folder must contain its SKILL.md at the top level.

## Requirements

- The job and company data comes through Apify (apify.com). Connect the Apify
  connector in Claude (Settings -> Connectors) and add a small credit balance.
  A full run costs roughly $0.30-0.50.
- Optional: connect Apollo.io (Settings -> Connectors) for one-call contact
  lookup and verified email addresses. Emails use your Apollo credits and are
  only fetched for rows you explicitly pick.

## Run it

Start a chat, attach your resume, and type something like:

  run the pipeline: AI product roles at high growth startups in the US

You'll get one table of the 10 best fresh jobs. Act on the top 1-2 today.
That's the whole point: the 24-hour edge decays fast.

## Honesty rules baked in

- Match scores below 0.55 are never shown
- Resume changes reframe your real experience, never fabricate
- Every message personalization traces to a real fetched fact
- Unverified emails are labeled, never presented as real

Questions? Reply to the newsletter issue you got this from.
