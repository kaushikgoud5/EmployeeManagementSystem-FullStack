using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography;

namespace Api.Helper
{
    public class PasswordHasherService
    {
        private readonly IPasswordHasher<string> _passwordHasher;
        public PasswordHasherService(IPasswordHasher<string> passwordHasher)
        {
            _passwordHasher=passwordHasher;
        }
        public string HashPassword(string password)
        {
            return _passwordHasher.HashPassword("", password);
        }

        public bool VerifyPassword(string password,string providedPassword) {
            var result = _passwordHasher.VerifyHashedPassword(null, password, providedPassword);
            return result == PasswordVerificationResult.Success;
        }

    }
}
