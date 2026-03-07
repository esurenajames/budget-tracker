# Agent Configuration - AppDev Central

## 🎨 Color Theme

Use these CSS variables or Tailwind classes for all UI elements:

- Primary: `#0F2A44` (`--primary`, `bg-primary`, `text-primary`)
- Accent 1: `#1677ff` (`--accent-1`, `bg-accent-1`, `text-accent-1`)
- Accent 2: `#FF8A3D` (`--accent-2`, `bg-accent-2`, `text-accent-2`)
- Neutral: `#F8FAFC` (`--neutral`, `bg-neutral`, `text-neutral`)

## 🛠️ Implementation Guidelines

- **Styling**: Always use the defined theme colors. Avoid hardcoded hex values in components.
- **Components**: Prioritize creating reusable components and using existing ones from `components/`.
- **Tables**: Use `StatusChip` for boolean status flags and `UserAvatar` for user entries.
- **Logic**: Keep business logic in `services/`, not in the components.
- **Naming**: Use PascalCase for components and camelCase for hooks/utils.
- **Forms**: Always use `Form` and `Input` from `antd` for forms and handle their validation rules.
- **Buttons**: Always use `Button` from `antd` instead of standard HTML `<button>` elements.
- **Data**: Always use the organized hooks in `hooks/` (e.g., `hooks/users/`, `hooks/dashboard/`).
- **Types/Interfaces**: Refer to `interface/user.ts` for the correct PascalCase backend property names (`AccountID`, `AccountName`, etc.).
- **Notifications**: When using Ant Design notification, always use `title` as the main header and `description` for the body content. Placement must always be set to `topRight`.

## 📁 Directory Structure Rules

Maintain the following structure for all new files and refactors:

/appdev-central
├── app/
│   ├── (auth)/        # login/, register/
│   ├── (dashboard)/   # analytics/, settings/
│   ├── api/          # Route handlers
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/           # Atomic components (Button, Input)
│   └── shared/       # Global components (Navbar, Footer)
├── lib/              # SDK/Base configs (Firestore, Auth)
├── services/         # Logic layer (apiClient, userService)
├── hooks/            # Custom React hooks
├── contexts/         # React Contexts (AuthContext)
├── utils/            # Helpers (formatters, validators)
├── types/            # TS definitions
├── styles/           # Global styles
├── public/           # Static assets
