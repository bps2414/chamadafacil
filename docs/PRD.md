# Product Requirements Document: ChamadaFácil

## Problem

Small businesses often receive support requests through scattered channels such as WhatsApp, email, phone calls, or informal messages. This makes it easy to lose context, forget requests, duplicate answers, or leave customers without a clear status.

ChamadaFácil solves this with a small help desk system where people can open tickets and check their ticket status, while an internal admin can organize and respond to requests.

## Target Users

- Customers or employees who need to request support from a small business.
- A business owner, assistant, or support operator who needs to manage incoming tickets.
- Beginner-friendly portfolio reviewers who need to understand the product quickly from the interface and repository.

## Goals

- Let users open a support ticket without creating an account.
- Let users check ticket progress using a ticket number and email.
- Let admins log in and manage tickets from a protected dashboard.
- Let admins filter tickets by status and urgency.
- Let admins update ticket status, mark urgent tickets, and write visible responses.
- Keep the app realistic, mobile-friendly, accessible, and finishable.

## Non-Goals

- No payment system.
- No chat system.
- No public user accounts for requesters.
- No multi-tenant SaaS model in the MVP.
- No file attachments in the MVP.
- No public knowledge base in the MVP.
- No email notification automation in the MVP.
- No complex SLA, billing, reporting, priority matrix, or enterprise role system.

## User Stories

- As a requester, I want to open a support ticket with my contact information and problem description so the business can help me.
- As a requester, I want to receive a ticket number so I can check the request later.
- As a requester, I want to check ticket status using my ticket number and email so my private request is not publicly listed.
- As an admin, I want to log in securely so only authorized people can manage tickets.
- As an admin, I want to view all tickets in one place so I can understand current support demand.
- As an admin, I want to filter tickets by status and urgency so I can focus on active work.
- As an admin, I want to update ticket status and urgency so the support workflow stays organized.
- As an admin, I want to write ticket responses so the requester can see progress and answers.

## MVP Scope

The MVP includes one public support flow, one ticket lookup flow, and one protected admin area.

Included:

- Public landing page.
- Public new ticket form.
- Public ticket lookup by ticket number and email.
- Admin login through Supabase Auth.
- Protected admin dashboard.
- Ticket status and urgency management.
- Admin response creation.
- Database migrations and demo seed plan.
- Responsive and accessible UI.

## Future Improvements

- Email notifications when tickets are opened or answered.
- Public knowledge base for common support questions.
- File attachments for screenshots and documents.
- Internal-only notes for admins.
- Multiple admin roles.
- Basic analytics for ticket volume and resolution time.
- SLA labels and overdue indicators.
- Customer satisfaction rating after ticket closure.
- Multi-business support if the product later becomes a SaaS.
