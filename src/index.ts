// Enable decorators
import 'reflect-metadata'; // Useful ? 

// Enable env config
import 'dotenv/config'; 

// Inject dependencies
import './infrastructure/adapters/adapters.di';

// Start API
import './infrastructure/api';
