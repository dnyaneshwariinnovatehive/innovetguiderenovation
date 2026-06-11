# InnovateGuide - Project Innovation Partner

A comprehensive platform for buying, selling, and exploring innovative IT projects created by students for students.

## Features

- **Project Marketplace**: Browse and purchase student-developed IT projects
- **Project Submission**: Students can submit their projects for review and sale
- **Admin Dashboard**: Complete administrative interface for project management
- **Custom Project Requests**: Request custom project development
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

- **Backend**: Flask (Python)
- **Database**: SQLite (development) / PostgreSQL (production)
- **Frontend**: HTML5, CSS3, JavaScript
- **Email**: Flask-Mail with Gmail SMTP
- **Deployment**: Gunicorn + WSGI

## Local Development Setup

### Prerequisites

- Python 3.11+
- pip
- virtualenv (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd innovateguide
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Initialize database**
   ```bash
   python create_demo.py
   ```

6. **Run the application**
   ```bash
   python app.py
   ```

   The application will be available at `http://localhost:5001`

## Production Deployment

### Environment Variables

Create a `.env` file with the following variables:

```env
FLASK_ENV=production
SECRET_KEY=your-super-secret-key-here
DATABASE_URL=postgresql://user:password@host:port/database
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_DEFAULT_SENDER=your-email@gmail.com
SESSION_COOKIE_SECURE=True
```

### Heroku Deployment

1. **Install Heroku CLI**
2. **Login to Heroku**
   ```bash
   heroku login
   ```
3. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```
4. **Set environment variables**
   ```bash
   heroku config:set FLASK_ENV=production
   heroku config:set SECRET_KEY=your-secret-key
   heroku config:set DATABASE_URL=your-database-url
   # ... set other required variables
   ```
5. **Deploy**
   ```bash
   git push heroku main
   ```

### Docker Deployment

1. **Build Docker image**
   ```bash
   docker build -t innovateguide .
   ```

2. **Run container**
   ```bash
   docker run -p 8000:8000 innovateguide
   ```

### Manual Server Deployment

1. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set environment variables**
   ```bash
   export FLASK_ENV=production
   export DATABASE_URL=your-database-url
   # ... other variables
   ```

3. **Run with Gunicorn**
   ```bash
   gunicorn --bind 0.0.0.0:8000 wsgi:application
   ```

## Project Structure

```
innovateguide/
├── app.py                 # Main application file
├── wsgi.py               # WSGI entry point
├── config.py             # Configuration management
├── models.py             # Database models
├── requirements.txt      # Python dependencies
├── Procfile              # Heroku deployment
├── runtime.txt          # Python version for Heroku
├── .env.example         # Environment variables template
├── AdminSide/           # Admin interface
│   ├── app.py
│   ├── templates/
│   └── static/
├── UserSide/            # User interface
│   └── UserSide/
│       ├── app.py
│       ├── templates/
│       └── static/
└── static/              # Shared static files
    └── uploads/         # User uploaded files
```

## Database Models

- **Project**: Main project listings
- **CustomProject**: Custom project requests
- **CustomProjectSubmission**: Student project submissions
- **ProjectBuyEnquiry**: Purchase enquiries
- **User**: User management (future)

## API Endpoints

### User Routes
- `GET /` - Homepage
- `GET /browse_all_projects` - Project catalog
- `GET /project/<id>` - Project details
- `POST /sell_your_project` - Submit project
- `POST /custom_project_request` - Request custom project
- `POST /buy_now/<id>` - Purchase enquiry

### Admin Routes
- `GET /admin/` - Admin dashboard
- `GET /admin/requested-projects` - Pending projects
- `POST /admin/approve-project/<id>` - Approve project

## Security Features

- CSRF protection
- Secure session management
- File upload validation
- SQL injection prevention
- XSS protection headers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@innovateguide.in or create an issue in the repository.