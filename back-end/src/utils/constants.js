import { env } from '~/config/environment'
export const WHITELIST_DOMAINS = [
    'https://dv-smart-phone-website-ex018ytzt-yeusone98s-projects.vercel.app'
]

export const BOARD_TYPES = {
    PUBLIC: 'public',
    PRIVATE: 'private'
}

export const WEBSITE_DOMAIN = (env.BUILD_MODE === 'production') ? env.WEBSITE_DOMAIN_PRODUCTION : env.WEBSITE_DOMAIN_DEVELOPMENT