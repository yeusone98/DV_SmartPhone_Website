import { env } from '~/config/environment'
export const WHITELIST_DOMAINS = [
    'http://localhost:5173'
    
    //.. Ví dụ sau này deploy lên domain chính thức ...vv
]

export const BOARD_TYPES = {
    PUBLIC: 'public',
    PRIVATE: 'private'
}

export const WEBSITE_DOMAIN = (env.BUILD_MODE === 'production') ? env.WEBSITE_DOMAIN_PRODUCTION : env.WEBSITE_DOMAIN_DEVELOPMENT