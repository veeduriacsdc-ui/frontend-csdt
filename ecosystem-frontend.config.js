module.exports = {
    apps: [{
        name: 'frontend-csdt',
        script: 'npm',
        args: 'run preview -- --host 0.0.0.0 --port 3000',
        cwd: '/var/www/frontend-csdt',
        instances: 1,
        exec_mode: 'fork',
        env: {
            NODE_ENV: 'production',
            VITE_API_URL: 'http://64.225.113.49:8000/api',
            VITE_APP_NAME: 'CSDT',
            VITE_APP_VERSION: '1.0.0',
            VITE_APP_ENV: 'production'
        },
        env_development: {
            NODE_ENV: 'development',
            VITE_API_URL: 'http://localhost:8000/api',
            VITE_APP_NAME: 'CSDT',
            VITE_APP_VERSION: '1.0.0',
            VITE_APP_ENV: 'development'
        },
        log_file: '/var/log/frontend-csdt/combined.log',
        out_file: '/var/log/frontend-csdt/out.log',
        error_file: '/var/log/frontend-csdt/error.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
        merge_logs: true,
        max_memory_restart: '512M',
        watch: false,
        ignore_watch: ['node_modules', 'dist', 'ayuda'],
        restart_delay: 4000,
        max_restarts: 10,
        min_uptime: '10s',
        kill_timeout: 5000,
        wait_ready: true,
        listen_timeout: 10000,
        autorestart: true,
        max_memory_restart: '1G',
        node_args: '--max-old-space-size=1024'
    }]
};
